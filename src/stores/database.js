import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore/lite";
import { auth } from "../firebaseConfig";
import { nanoid } from "nanoid";
import router from "../router";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loadingDoc: false,
  }),
  actions: {
    async getUrls() {
      if (this.documents.length !== 0) {
        return;
      }
      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "urls"),
          // se identifica al usuario autenticado
          where("user", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const fetchedDocuments = []; // Almacenar documentos recuperados

        querySnapshot.forEach((doc) => {
          // console.log(doc.id, doc.data());
          // empujando los documentos
          fetchedDocuments.push({
            id: doc.id,
            ...doc.data(), // deestructuración
          });
        });
        this.documents = fetchedDocuments; // Asigna los documentos recuperados a la propiedad documents
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addUrl(name) {
      try {
        const objetoDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "urls"), objetoDoc);
        // console.log(docRef.id);
        this.documents.push({
          ...objetoDoc,
          id: docRef.id,
        });
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async leerUrl(id) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSpan = await getDoc(docRef);

        if (!docSpan.exists()) {
          throw new Error("no existe el doc");
        }

        if (docSpan.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertenece ese documento");
        }

        return docSpan.data().name;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updateUrl(id, name) {
      try {
        this.loadingDoc = true;

        const docRef = doc(db, "urls", id);

        const docSpan = await getDoc(docRef);
        if (!docSpan.exists()) {
          throw new Error("no existe el doc");
        }

        if (docSpan.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertenece ese documento");
        }

        await updateDoc(docRef, {
          name: name,
        });  

        this.documents = this.documents.map((item) =>
          item.id === id ? { ...item, name: name } : item
        );
        router.push("/");
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loadingDoc = false;
      }
    },
    async deleteUrl(id) {
      try {
        const docRef = doc(db, "urls", id);

        const docSpan = await getDoc(docRef);
        if (!docSpan.exists()) {
          throw new Error("no existe el doc");
        }

        if (docSpan.data().user !== auth.currentUser.uid) {
          throw new Error("No le pertenece ese documento");
        }

        await deleteDoc(docRef);
        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    },
  },
});

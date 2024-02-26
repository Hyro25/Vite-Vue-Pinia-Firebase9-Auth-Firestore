import { defineStore } from "pinia";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router"; // Cambia la importación para que sea un import default

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = {
          email: user.email,
          uid: user.uid,
        };
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = {
          email: user.email,
          uid: user.uid,
        };
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      this.loadingUser = true;
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },

    async currentUser() {
        debugger;
        try {
            const user = await new Promise((resolve, reject) => {
                    const unsuscribe = onAuthStateChanged(auth,
                        (user) => {
                            unsuscribe()
                            resolve(user)
                        },reject)
            })
            debugger
            if (user) {
                this.userData = {
                email: user.email,
                uid: user.uid,
               };
            } else {
                this.userData = null;
             }
             return user
            // return new Promise((resolve, reject) => {
            //     const unsuscribe = onAuthStateChanged(
            //       auth,
                  
                    
                     
                     
            //         resolve(user);
            //       },
            //       (e) => reject(e)
            //     );
            //     unsuscribe();
            //   });
            

        } catch (error) {
            console.log(error)    
        }
    },
  },
});

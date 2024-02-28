import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'

import { getFirestore } from 'firebase/firestore/lite'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSyH33ag9vyuZqdUwhjZHjOPbQnuEyRcA",
  authDomain: "vue-3-2024-a049a.firebaseapp.com",
  projectId: "vue-3-2024-a049a",
  storageBucket: "vue-3-2024-a049a.appspot.com",
  messagingSenderId: "385782915285",
  appId: "1:385782915285:web:a9d73af685346975d9c25c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
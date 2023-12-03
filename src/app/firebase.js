

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyBNsqESe9lCQKCE1FauBBjgz-u4bTD2rkk",
  authDomain: "pro3-ac406.firebaseapp.com",
  projectId: "pro3-ac406",
  storageBucket: "pro3-ac406.appspot.com",
  messagingSenderId: "1090194810435",
  appId: "1:1090194810435:web:a032f19bcaea113ae296f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
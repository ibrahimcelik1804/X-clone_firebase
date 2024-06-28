// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKV3ZmrNQA0CEP8dzQchhO5qcKwYQPk64",
  authDomain: "twitter-bc336.firebaseapp.com",
  projectId: "twitter-bc336",
  storageBucket: "twitter-bc336.appspot.com",
  messagingSenderId: "450468097808",
  appId: "1:450468097808:web:36c4bffa0850c94bd83f95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// auth yapısının refaransını alma
export const auth = getAuth(app);
//google saglayıcı refaransını alamak için
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storeage = getStorage(app);

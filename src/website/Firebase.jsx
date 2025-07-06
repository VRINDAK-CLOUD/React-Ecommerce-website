import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBgvqi16PvcnnLCM-y5u4XYDjIlHkfiLWg",
  authDomain: "login-register-8347c.firebaseapp.com",
  projectId: "login-register-8347c",
  storageBucket: "login-register-8347c.firebasestorage.app",
  messagingSenderId: "533802256913",
  appId: "1:533802256913:web:bbcb933b7124ced9d97fb0"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsTL8gf_6x-9PZZGxtw1j_28YXMszsS-g",
  authDomain: "soulviva.firebaseapp.com",
  projectId: "soulviva",
  storageBucket: "soulviva.firebasestorage.app",
  messagingSenderId: "625690532447",
  appId: "1:625690532447:web:76c2148689621463e759ea",
  measurementId: "G-7XD2CBW92J"
};

// Initialize Firebase (SSR-safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };

// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Si usarás Firestore
import { getStorage } from "firebase/storage"; // Si usarás imágenes

const firebaseConfig = {
  apiKey: "AIzaSyDml-13MSnUTyxdB4-Zz_fwYKtgJN2qI2c",
  authDomain: "olemita-c79ad.firebaseapp.com",
  projectId: "olemita-c79ad",
  storageBucket: "olemita-c79ad.appspot.com", // corregido el dominio
  messagingSenderId: "499325574137",
  appId: "1:499325574137:web:92040b4341530e6d343b28"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

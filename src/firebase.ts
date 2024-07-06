// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw_QLhybcjcwotyxlR6Ss9fbfjNwK-sXQ",
  authDomain: "kawitterclone.firebaseapp.com",
  projectId: "kawitterclone",
  storageBucket: "kawitterclone.appspot.com",
  messagingSenderId: "842125769791",
  appId: "1:842125769791:web:df6554c162ac62433a8c8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app); // Initialize Firestore

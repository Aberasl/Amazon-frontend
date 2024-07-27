// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGS69cD49Xz1mZx7qlxqfxKfozXQ8S9BM",
  authDomain: "clone-6ab20.firebaseapp.com",
  projectId: "clone-6ab20",
  storageBucket: "clone-6ab20.appspot.com",
  messagingSenderId: "785140238198",
  appId: "1:785140238198:web:8ba5b11a2d922a7acbdc57",
};

const app = initializeApp(firebaseConfig);

// Export Firebase services
export const db = getFirestore(app); // Firestore database

export const auth = getAuth(app); // Authentication service

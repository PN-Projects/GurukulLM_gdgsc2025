
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
// Make sure these environment variables are properly set in your deployment environment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBEFkE1j6QoZYJvWp2LJK8o2exfgRtkXb8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gurukullm.firebaseapp.com", 
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gurukullm",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gurukullm.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "382481958229",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:382481958229:web:050359f141c32ed998dbdc",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-YLLFHKJJVK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

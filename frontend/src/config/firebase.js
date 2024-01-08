// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBiPCFxvglko2gTlusJRmrEjArJa9khhec",
  authDomain: "booking-application-74986.firebaseapp.com",
  projectId: "booking-application-74986",
  storageBucket: "booking-application-74986.appspot.com",
  messagingSenderId: "724672038638",
  appId: "1:724672038638:web:4b81bb58abbde7fc9095ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };
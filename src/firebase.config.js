// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Config
const firebaseConfig = {
    apiKey: "AIzaSyD-Sl6sGaVWReMOGB1MkJAy-OhMdnrV7V4",
    authDomain: "house-marketplace-app-2fe21.firebaseapp.com",
    projectId: "house-marketplace-app-2fe21",
    storageBucket: "house-marketplace-app-2fe21.appspot.com",
    messagingSenderId: "77787531418",
    appId: "1:77787531418:web:04c3e7c6f99b55168b3723"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
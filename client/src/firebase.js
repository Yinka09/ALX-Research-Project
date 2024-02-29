// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "alx-researchproject.firebaseapp.com",
  projectId: "alx-researchproject",
  storageBucket: "alx-researchproject.appspot.com",
  messagingSenderId: "1074830428222",
  appId: "1:1074830428222:web:1c7840079bcd19c4f6e96f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

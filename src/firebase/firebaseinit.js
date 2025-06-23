// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyABCO30hiSL_Slu0XMdXNBgMIrtvkdUdeY",
  // authDomain: "treeshop-c0639.firebaseapp.com",
  // projectId: "treeshop-c0639",
  // storageBucket: "treeshop-c0639.firebasestorage.app",
  // messagingSenderId: "326724422752",
  // appId: "1:326724422752:web:2e04744d6c10619c204705"
   apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId ,
  storageBucket:import.meta.env.VITE_storageBucket ,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
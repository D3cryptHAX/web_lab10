import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDs27h5GbXEMcuTQlsxPEIVh4fKLHBCrAg",
    authDomain: "web10-5d164.firebaseapp.com",
    projectId: "web10-5d164",
    storageBucket: "web10-5d164.firebasestorage.app",
    messagingSenderId: "634047512011",
    appId: "1:634047512011:web:18edea875b85e1a7ac4a4e",
    measurementId: "G-HN5XSVH842"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

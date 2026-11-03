import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnRAQ9ZX82hOCqnML9QqPfBIJNzhSXIHU",
  authDomain: "tiger-market-73a36.firebaseapp.com",
  projectId: "tiger-market-73a36",
  storageBucket: "tiger-market-73a36.firebasestorage.app",
  messagingSenderId: "219212142513",
  appId: "1:219212142513:web:364f290d2cc6188c9f8f90",
  measurementId: "G-N0SN077EY6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
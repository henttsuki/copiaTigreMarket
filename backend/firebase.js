
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD0cvEwY8cSQQ19NShBHdX_pzwhkvDvka0",
  authDomain: "tigre-market-c389c.firebaseapp.com",
  projectId: "tigre-market-c389c",
  storageBucket: "tigre-market-c389c.firebasestorage.app",
  messagingSenderId: "1002919608362",
  appId: "1:1002919608362:web:7d6b59af58524183990353",
  measurementId: "G-3VM1KYWQ49"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
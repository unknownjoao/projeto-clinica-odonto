import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdeGcjtDA1kAWGzKyu5yPemf4tbKtTA5k",
  authDomain: "testando-4f1e8.firebaseapp.com",
  databaseURL: "https://testando-4f1e8-default-rtdb.firebaseio.com",
  projectId: "testando-4f1e8",
  storageBucket: "testando-4f1e8.firebasestorage.app",
  messagingSenderId: "253174909458",
  appId: "1:253174909458:web:8212d8405f99baecfda6cb",
  measurementId: "G-NKYYDPPYLC",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;

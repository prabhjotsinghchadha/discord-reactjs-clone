import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJOgCxszhP1cISsjpILChQ8lFDV3Wnbyk",
  authDomain: "discord-clone-b2890.firebaseapp.com",
  projectId: "discord-clone-b2890",
  storageBucket: "discord-clone-b2890.appspot.com",
  messagingSenderId: "845184068816",
  appId: "1:845184068816:web:e1a16a2d17c0fa011182d5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, firebaseApp };
export default db;

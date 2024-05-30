import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNvLQE6mw96h6A5HRwFbrh8ERwNhVdDL8",
  authDomain: "lampungsehat-d0cf9.firebaseapp.com",
  projectId: "lampungsehat-d0cf9",
  storageBucket: "lampungsehat-d0cf9.appspot.com",
  messagingSenderId: "531184776178",
  appId: "1:531184776178:web:3fb38a1236ff9cb466716b",
  measurementId: "G-9ECJGY3GX0"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage }
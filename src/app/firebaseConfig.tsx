import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
const auth = getAuth();

const app1 = initializeApp(firebaseConfig);
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app1);

export { storage, ref, uploadBytes, getDownloadURL };
export default firebase_app;

export { app, db, auth }
// const analytics = getAnalytics(app);
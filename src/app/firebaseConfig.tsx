import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage,  ref, uploadBytes, getDownloadURL } from "firebase/storage";

/*const firebaseConfig = {
  apiKey: "AIzaSyDNvLQE6mw96h6A5HRwFbrh8ERwNhVdDL8",
  authDomain: "lampungsehat-d0cf9.firebaseapp.com",
  projectId: "lampungsehat-d0cf9",
  storageBucket: "lampungsehat-d0cf9.appspot.com",
  messagingSenderId: "531184776178",
  appId: "1:531184776178:web:3fb38a1236ff9cb466716b",
  measurementId: "G-9ECJGY3GX0"
};*/

const firebaseConfig = {
  apiKey: "AIzaSyCOVWUcBNB9FrSh-5deZJeBv-XAcTwwC70",
  authDomain: "inisiatif-lampung-sehat.firebaseapp.com",
  projectId: "inisiatif-lampung-sehat",
  storageBucket: "inisiatif-lampung-sehat.appspot.com",
  messagingSenderId: "712599851493",
  appId: "1:712599851493:web:29f4828f01126290e7df0c",
  measurementId: "G-ZDP6HB4H14"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage, ref, uploadBytes, getDownloadURL }
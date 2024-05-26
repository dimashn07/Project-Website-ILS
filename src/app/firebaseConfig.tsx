import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCOVWUcBNB9FrSh-5deZJeBv-XAcTwwC70",
  authDomain: "inisiatif-lampung-sehat.firebaseapp.com",
  projectId: "inisiatif-lampung-sehat",
  storageBucket: "inisiatif-lampung-sehat.appspot.com",
  messagingSenderId: "712599851493",
  appId: "1:712599851493:web:29f4828f01126290e7df0c",
  measurementId: "G-ZDP6HB4H14"
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };

export default firebase_app;

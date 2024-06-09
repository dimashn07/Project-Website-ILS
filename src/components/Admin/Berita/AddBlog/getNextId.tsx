import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

const getNextId = async () => {
  const idDocRef = doc(db, 'blogPostMeta', 'highestId');
  const idDocSnap = await getDoc(idDocRef);

  let nextId = 1;
  if (idDocSnap.exists()) {
    nextId = idDocSnap.data().highestId + 1;
    await setDoc(idDocRef, { highestId: nextId }, { merge: true });
  } else {
    await setDoc(idDocRef, { highestId: nextId });
  }
  
  return nextId;
};

export default getNextId;

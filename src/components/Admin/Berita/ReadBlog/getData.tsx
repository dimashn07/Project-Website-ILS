import firebase_app from "@/app/firebaseConfig";
import { getFirestore, doc, getDoc, DocumentData } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getDocument(collection: string, id: string) {
  let docRef = doc(db, collection, id);
  let error: Error | null = null;
  let documentData: DocumentData | null = null;

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      documentData = docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    error = e;
  }

  return { error, documentData };
}

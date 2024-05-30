import firebase_app from "@/app/firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(collection, id, data) {
    let error = null;

    try {
        await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { error };
}

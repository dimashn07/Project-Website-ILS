import { getFirestore, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

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

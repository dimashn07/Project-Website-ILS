import { collection, doc, getDocs, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

export async function getDonasi(session){
    const donasiCollection = collection(db, 'donasi');
    const querySnapshot = await getDocs(query(donasiCollection));
    let donasiArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const donasiData = doc.data();
        donasiArr.push({id: doc.id, ...donasiData});
    });
    return donasiArr;
} 

export async function editDonasi(donasiId, updatedData, session){
  try {
      const donasiRef = doc(db, 'donasi', donasiId);
      await updateDoc(donasiRef, updatedData);
      console.log('Paragraf berhasil diubah dengan ID: ', donasiId);
      return true;
  } catch(error){
      console.error('ERROR: ', error);
      return false;
  }
}


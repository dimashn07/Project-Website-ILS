import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy, runTransaction, limit} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

export async function addVisi(deskripsi, session) {
    try {
        const docRef = await addDoc(collection(db, 'visi'), {
          deskripsi: deskripsi,
          author: session.user.email, 
          timestamp: serverTimestamp(),
        });
        console.log('Visi berhasil ditambahkan dengan ID: ', docRef.id);
        return true;
    } catch (error) {
        console.error('ERROR: ', error);
        return false;
    }
}

export async function getVisi(session){
    const visiCollection = collection(db, 'visi');
    const querySnapshot = await getDocs(query(visiCollection));
    let visiArr: { id: string }[] = [];
    querySnapshot.forEach((doc) => {
        const visiData = doc.data();
        visiArr.push({id: doc.id, ...visiData});
    });
    return visiArr;
} 

export async function editVisi(visiId, updatedData, session) {
  try {
      const visiRef = doc(db, 'visi', visiId);
      await updateDoc(visiRef, updatedData);
      console.log('Visi berhasil diubah dengan ID: ', visiId);
      return true;
  } catch (error) {
      console.error('ERROR: ', error);
      return false;
  }
}


export async function deleteVisi(visiId, session) {
    try{
        console.log('Hapus visi dengan ID: ', visiId);
        await deleteDoc(doc (db, 'visi', visiId));
        return visiId;
    }catch(error){
        console.error('ERROR: ', error);
        return null;
    }
    
}


import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy, runTransaction, limit} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

export async function addVisi(deskripsi) {
    try {
        const docRef = await addDoc(collection(db, 'visi'), {
          deskripsi: deskripsi,
          // author: 'author_name', 
          timestamp: serverTimestamp(),
        });
        console.log('Visi berhasil ditambahkan dengan ID: ', docRef.id);
        return true;
    } catch (error) {
        console.error('ERROR: ', error);
        return false;
    }
}

export async function getVisi(){
    const visiCollection = collection(db, 'visi');
    const querySnapshot = await getDocs(query(visiCollection));
    let visiArr: { id: string }[] = [];
    querySnapshot.forEach((doc) => {
        const visiData = doc.data();
        visiArr.push({id: doc.id, ...visiData});
    });
    return visiArr;
} 

export async function editVisi(visiId, updatedData) {
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


export async function deleteVisi(visiId) {
    try{
        console.log('Hapus visi dengan ID: ', visiId);
        await deleteDoc(doc (db, 'visi', visiId));
        return visiId;
    }catch(error){
        console.error('ERROR: ', error);
        return null;
    }
    
}


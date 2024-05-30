import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query} from "firebase/firestore";
import { db, storage } from "@/app/firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function addPengurusILS(kategori, nama, jabatan, fotoURL, session){
    try {
        const docRef = await addDoc(collection(db, 'pengurusILS'), {
          kategori: kategori,
          nama: nama.toUpperCase(),
          jabatan: jabatan,
          foto: fotoURL,
          author: session.user.email, 
          timestamp: serverTimestamp(),
        });
        console.log('Pengurus berhasil ditambahkan dengan ID: ', docRef.id);
        return true;
    }catch(error){
        console.error('ERROR: ', error);
        return false;
    }
}

export async function getPengurusILS(session){
    const pengurusCollection = collection(db, 'pengurusILS');
    const querySnapshot = await getDocs(query(pengurusCollection));
    let pengurusArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const pengurusData = doc.data();
        pengurusArr.push({id: doc.id, ...pengurusData});
    });
    return pengurusArr;
} 

export async function editPengurusILS(pengurusId, updatedData, session){
  try {
      const pengurusRef = doc(db, 'pengurusILS', pengurusId);
      await updateDoc(pengurusRef, updatedData);
      console.log('Pengurus berhasil diubah dengan ID: ', pengurusId);
      return true;
  } catch(error){
      console.error('ERROR: ', error);
      return false;
  }
}

export async function deletePengurusILS(pengurusId, foto, session) {
    try {
      console.log('Hapus pengurus dengan ID: ', pengurusId);
      await deleteDoc(doc(db, 'pengurusILS', pengurusId));
  
      if(foto){
        const imageRef = ref(storage, foto);
        await deleteObject(imageRef);
        console.log('File foto berhasil dihapus dari penyimpanan.');
      }
      return pengurusId;
    } catch (error) {
      console.error('ERROR: ', error);
      return null;
    }
}

export async function uploadFoto(foto){
    try {
        const storageRef = ref(storage, `pengurusILS/${Date.now()}-${foto.name}`);
        const snapshot = await uploadBytes(storageRef, foto);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    }catch(error) {
        console.error('ERROR: ', error);
        throw error;
    }
}

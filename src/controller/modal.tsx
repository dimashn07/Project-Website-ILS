import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query } from "firebase/firestore";
import { db, storage } from "@/app/firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function addModal(deskripsi, gambarURL, session){
    try {
        const docRef = await addDoc(collection(db, 'modal'), {
          deskripsi: deskripsi,
          gambar: gambarURL,
          author: session.user.email, 
          timestamp: serverTimestamp(),
        });
        console.log('Modal berhasil ditambahkan dengan ID: ', docRef.id);
        return true;
    }catch(error){
        console.error('ERROR: ', error);
        return false;
    }
}

export async function getModals(session){
    const modalCollection = collection(db, 'modal');
    const querySnapshot = await getDocs(query(modalCollection));
    let modalArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const modalData = doc.data();
        modalArr.push({id: doc.id, ...modalData});
    });
    return modalArr;
} 

export async function editModal(modalId, updatedData, session){
  try {
      const modalRef = doc(db, 'modal', modalId);
      await updateDoc(modalRef, updatedData);
      console.log('Modal berhasil diubah dengan ID: ', modalId);
      return true;
  } catch(error){
      console.error('ERROR: ', error);
      return false;
  }
}

export async function deleteModal(modalId, gambar, session) {
    try {
      console.log('Hapus modal dengan ID: ', modalId);
      await deleteDoc(doc(db, 'modal', modalId));
  
      if(gambar){
        const imageRef = ref(storage, gambar);
        await deleteObject(imageRef);
        console.log('File gambar berhasil dihapus dari penyimpanan.');
      }
      return modalId;
    } catch (error) {
      console.error('ERROR: ', error);
      return null;
    }
}

export async function uploadGambar(gambar){
    try {
        const storageRef = ref(storage, `modal/${Date.now()}-${gambar.name}`);
        const snapshot = await uploadBytes(storageRef, gambar);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    }catch(error) {
        console.error('ERROR: ', error);
        throw error;
    }
}

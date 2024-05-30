import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy, runTransaction, limit} from "firebase/firestore";
import { db, storage } from "@/app/firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function addKontribusi(jenis, jumlah, keterangan, gambarURL, session){
    try {
        const docRef = await addDoc(collection(db, 'kontribusi'), {
          jenis: jenis,
          jumlah: jumlah,
          keterangan: keterangan,
          gambar: gambarURL,
          author: session.user.email, 
          timestamp: serverTimestamp(),
        });
        console.log('Kontribusi berhasil ditambahkan dengan ID: ', docRef.id);
        return true;
    }catch(error){
        console.error('ERROR: ', error);
        return false;
    }
}

export async function getKontribusi(session){
    const kontribusiCollection = collection(db, 'kontribusi');
    const querySnapshot = await getDocs(query(kontribusiCollection));
    let kontribusiArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const kontribusiData = doc.data();
        kontribusiArr.push({id: doc.id, ...kontribusiData});
    });
    return kontribusiArr;
} 

export async function editKontribusi(kontribusiId, updatedData, session){
  try {
      const kontribusiRef = doc(db, 'kontribusi', kontribusiId);
      await updateDoc(kontribusiRef, updatedData);
      console.log('Kontribusi berhasil diubah dengan ID: ', kontribusiId);
      return true;
  } catch(error){
      console.error('ERROR: ', error);
      return false;
  }
}

export async function deleteKontribusi(kontribusiId, gambar, session) {
    try {
      console.log('Hapus kontribusi dengan ID: ', kontribusiId);
      await deleteDoc(doc(db, 'kontribusi', kontribusiId));
  
      if(gambar){
        const imageRef = ref(storage, gambar);
        await deleteObject(imageRef);
        console.log('File gambar berhasil dihapus dari penyimpanan.');
      }
      return kontribusiId;
    } catch (error) {
      console.error('ERROR: ', error);
      return null;
    }
}

export async function uploadGambar(gambar){
    try {
        const storageRef = ref(storage, `kontribusi/${Date.now()}-${gambar.name}`);
        const snapshot = await uploadBytes(storageRef, gambar);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    }catch(error) {
        console.error('ERROR: ', error);
        throw error;
    }
}

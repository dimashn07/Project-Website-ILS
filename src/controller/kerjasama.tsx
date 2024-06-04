import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db, storage } from "@/app/firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function addKerjasama(instansi, deskripsi, logoURL, session){
    try {
        const docRef = await addDoc(collection(db, 'kerjasama'), {
          instansi: instansi,
          deskripsi: deskripsi,
          logo: logoURL,
          author: session.user.email, 
          timestamp: serverTimestamp(),
        });
        console.log('Kerjasama berhasil ditambahkan dengan ID: ', docRef.id);
        return true;
    }catch(error){
        console.error('ERROR: ', error);
        return false;
    }
}

export async function getKerjasama(session){
    const kerjasamaCollection = collection(db, 'kerjasama');
    const querySnapshot = await getDocs(query(kerjasamaCollection, orderBy('instansi', 'asc')));
    let kerjasamaArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const kerjasamaData = doc.data();
        kerjasamaArr.push({id: doc.id, ...kerjasamaData});
    });
    return kerjasamaArr;
} 

export async function editKerjasama(kerjasamaId, updatedData, session){
  try {
      const kerjasamaRef = doc(db, 'kerjasama', kerjasamaId);
      await updateDoc(kerjasamaRef, updatedData);
      console.log('Kerjasama berhasil diubah dengan ID: ', kerjasamaId);
      return true;
  } catch(error){
      console.error('ERROR: ', error);
      return false;
  }
}

export async function deleteKerjasama(kerjasamaId, logo, session) {
    try {
      console.log('Hapus kerjasama dengan ID: ', kerjasamaId);
      await deleteDoc(doc(db, 'kerjasama', kerjasamaId));
  
      if(logo){
        const imageRef = ref(storage, logo);
        await deleteObject(imageRef);
        console.log('File gambar berhasil dihapus dari penyimpanan.');
      }
      return kerjasamaId;
    } catch (error) {
      console.error('ERROR: ', error);
      return null;
    }
}

export async function uploadGambar(logo){
    try {
        const storageRef = ref(storage, `kerjasama/${Date.now()}-${logo.name}`);
        const snapshot = await uploadBytes(storageRef, logo);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    }catch(error) {
        console.error('ERROR: ', error);
        throw error;
    }
}

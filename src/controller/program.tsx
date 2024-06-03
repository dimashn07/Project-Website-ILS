import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query } from "firebase/firestore";
import { db, storage } from "@/app/firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function addProgram(judul, deskripsi, beritaURL, gambarURL, session){
    try {
        const docRef = await addDoc(collection(db, 'program'), {
          judul: judul,
          deskripsi: deskripsi,
          berita: beritaURL,
          gambar: gambarURL,
          author: session.user.email, 
          timestamp: serverTimestamp(),
        });
        console.log('Program berhasil ditambahkan dengan ID: ', docRef.id);
        return true;
    }catch(error){
        console.error('ERROR: ', error);
        return false;
    }
}

export async function getPrograms(session){
    const programCollection = collection(db, 'program');
    const querySnapshot = await getDocs(query(programCollection));
    let programArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const programData = doc.data();
        programArr.push({id: doc.id, ...programData});
    });
    return programArr;
} 

export async function editProgram(programId, updatedData, session){
  try {
      const programRef = doc(db, 'program', programId);
      await updateDoc(programRef, updatedData);
      console.log('Program berhasil diubah dengan ID: ', programId);
      return true;
  } catch(error){
      console.error('ERROR: ', error);
      return false;
  }
}

export async function deleteProgram(programId, gambar, session) {
    try {
      console.log('Hapus program dengan ID: ', programId);
      await deleteDoc(doc(db, 'program', programId));
  
      if(gambar){
        const imageRef = ref(storage, gambar);
        await deleteObject(imageRef);
        console.log('File gambar berhasil dihapus dari penyimpanan.');
      }
      return programId;
    } catch (error) {
      console.error('ERROR: ', error);
      return null;
    }
}

export async function uploadGambar(gambar){
    try {
        const storageRef = ref(storage, `program/${Date.now()}-${gambar.name}`);
        const snapshot = await uploadBytes(storageRef, gambar);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    }catch(error) {
        console.error('ERROR: ', error);
        throw error;
    }
}

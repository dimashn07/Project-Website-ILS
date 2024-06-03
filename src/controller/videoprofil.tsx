import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy, runTransaction, limit} from "firebase/firestore";
import { db, storage } from "@/app/firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function addVideoProfil(deskripsi, videoURL, gambarURL, session){
    try {
      await runTransaction(db, async(transaction) => {
        const q = query(collection(db, 'videoProfil'));
        const querySnapshot = await getDocs(q);

        const docRef = await addDoc(collection(db, 'videoProfil'), {
          deskripsi: deskripsi,
          link: videoURL,
          gambar: gambarURL,
          author: session.user.email, 
          timestamp: serverTimestamp(),
        });
        console.log('Link video berhasil ditambahkan dengan ID: ', docRef.id);
      });
      return true;
    } catch(error){
      console.error('ERROR: ', error);
      return false;
    }
  }

export async function getVideoProfil(session){
    const videoCollection = collection(db, 'videoProfil');
    const querySnapshot = await getDocs(query(videoCollection));
    let videoArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const videoData = doc.data();
        videoArr.push({id: doc.id, ...videoData});
    });
    return videoArr;
} 

export async function editVideoProfil(videoId, updatedData, session){
  try {
      const videoRef = doc(db, 'videoProfil', videoId);
      await updateDoc(videoRef, updatedData);
      console.log('Link video berhasil diubah dengan ID: ', videoId);
      return true;
  } catch(error){
      console.error('ERROR: ', error);
      return false;
  }
}


export async function deleteVideoProfil(videoId, gambar, session){
    try{
        console.log('Hapus link video dengan ID: ', videoId);
        await deleteDoc(doc (db, 'videoProfil', videoId));

        if(gambar){
          const imageRef = ref(storage, gambar);
          await deleteObject(imageRef);
          console.log('File gambar berhasil dihapus dari penyimpanan.');
        }
        return videoId;
        
    }catch(error){
        console.error('ERROR: ', error);
        return null;
    }
    
}

export async function uploadGambar(gambar){
  try {
      const storageRef = ref(storage, `videoProfil/${Date.now()}-${gambar.name}`);
      const snapshot = await uploadBytes(storageRef, gambar);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
  }catch(error) {
      console.error('ERROR: ', error);
      throw error;
  }
}


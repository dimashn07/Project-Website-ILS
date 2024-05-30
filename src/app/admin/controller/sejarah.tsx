import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy, runTransaction, limit} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

export async function addSejarah(deskripsi, session){
    try {
      await runTransaction(db, async(transaction) => {
        const q = query(collection(db, 'sejarah'), orderBy('paragraf', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        let lastParagraf = 0;
  
        if(!querySnapshot.empty){
          const lastDoc = querySnapshot.docs[0];
          lastParagraf = lastDoc.data().paragraf || 0;
        }
  
        const newParagraf = lastParagraf + 1;
        const docRef = await addDoc(collection(db, 'sejarah'), {
          paragraf: newParagraf,
          deskripsi: deskripsi,
          author: session.user.email, 
          timestamp: serverTimestamp(),
        });
        console.log('Paragraf berhasil ditambahkan dengan ID: ', docRef.id);
      });
      return true;
    } catch(error){
      console.error('ERROR: ', error);
      return false;
    }
  }

export async function getSejarah(session){
    const sejarahCollection = collection(db, 'sejarah');
    const querySnapshot = await getDocs(query(sejarahCollection, orderBy('paragraf', 'asc')));
    let sejarahArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const sejarahData = doc.data();
        sejarahArr.push({id: doc.id, ...sejarahData});
    });
    return sejarahArr;
} 

export async function editSejarah(sejarahId, updatedData, session){
  try {
      const sejarahRef = doc(db, 'sejarah', sejarahId);
      await updateDoc(sejarahRef, updatedData);
      console.log('Paragraf berhasil diubah dengan ID: ', sejarahId);
      return true;
  } catch(error){
      console.error('ERROR: ', error);
      return false;
  }
}


export async function deleteSejarah(sejarahId, session){
    try{
        console.log('Hapus paragraf dengan ID: ', sejarahId);
        await deleteDoc(doc (db, 'sejarah', sejarahId));
        return sejarahId;
    }catch(error){
        console.error('ERROR: ', error);
        return null;
    }
    
}

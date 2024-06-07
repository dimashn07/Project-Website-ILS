import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy, runTransaction, limit} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

export async function addSebaranWilayah(wilayah, alamat, latitude, longitude, maps, session){
    try {
        await runTransaction(db, async(transaction) => {
            const q = query(collection(db, 'sebaranWilayah'), orderBy('urutan', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);
            let lastUrutan = 0;
      
            if(!querySnapshot.empty){
              const lastDoc = querySnapshot.docs[0];
              lastUrutan = lastDoc.data().urutan || 0;
            }
      
            const newUrutan = lastUrutan + 1;
            const docRef = await addDoc(collection(db, 'sebaranWilayah'), {
              urutan: newUrutan,
              wilayah: wilayah,
              alamat: alamat,
              latitude: latitude,
              longitude: longitude,
              maps: maps,
              author: session.user.email, 
              timestamp: serverTimestamp(),
            });
            console.log('Wilayah berhasil ditambahkan dengan ID: ', docRef.id);
          });
    }catch(error){
        console.error('ERROR: ', error);
        return false;
    }
}

export async function getSebaranWilayah(session){
    const sebaranWilayahCollection = collection(db, 'sebaranWilayah');
    const querySnapshot = await getDocs(query(sebaranWilayahCollection, orderBy('urutan', 'asc')));
    let sebaranWilayahArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const sebaranWilayahData = doc.data();
        sebaranWilayahArr.push({id: doc.id, ...sebaranWilayahData});
    });
    return sebaranWilayahArr;
} 

export async function editSebaranWilayah(sebaranWilayahId, updatedData, session){
  try {
      const sebaranWilayahRef = doc(db, 'sebaranWilayah', sebaranWilayahId);
      await updateDoc(sebaranWilayahRef, updatedData);
      console.log('Sebaran Wilayah berhasil diubah dengan ID: ', sebaranWilayahId);
      return true;
  } catch(error){
      console.error('ERROR: ', error);
      return false;
  }
}

export async function deleteSebaranWilayah(sebaranWilayahId, session){
    try{
        console.log('Hapus wilayah dengan ID: ', sebaranWilayahId);
        await deleteDoc(doc (db, 'sebaranWilayahId', sebaranWilayahId));
        return sebaranWilayahId;
    }catch(error){
        console.error('ERROR: ', error);
        return null;
    }
}


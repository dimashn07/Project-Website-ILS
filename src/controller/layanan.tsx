import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy, runTransaction, limit} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

export async function addLayanan(nama, jenisKelamin, whatsapp, email, jenisLayanan, kabupaten, puskesmas, keterangan){
    try {
      await runTransaction(db, async(transaction) => {
        const q = query(collection(db, 'layanan'), orderBy('urutan', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        let lastUrutan = 0;
  
        if(!querySnapshot.empty){
          const lastDoc = querySnapshot.docs[0];
          lastUrutan = lastDoc.data().paragraf || 0;
        }
  
        const newUrutan = lastUrutan + 1;
        const docRef = await addDoc(collection(db, 'layanan'), {
          urutan: newUrutan,
          nama: nama,
          jenisKelamin: jenisKelamin,
          whatsapp: whatsapp,
          email: email,
          jenisLayanan: jenisLayanan,
          kabupaten: kabupaten,
          puskesmas: puskesmas,
          keterangan: keterangan,
          status: 'Belum Ditanggapi',
          author: '', 
          timestamp: serverTimestamp(),
        });
        console.log('Pengaduan berhasil ditambahkan dengan ID: ', docRef.id);
      });
      return true;
    } catch(error){
      console.error('ERROR: ', error);
      return false;
    }
  }

export async function getLayanan(session){
    const layananCollection = collection(db, 'layanan');
    const querySnapshot = await getDocs(query(layananCollection, orderBy('timestamp', 'asc')));
    let layananArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const layananData = doc.data();
        layananArr.push({id: doc.id, ...layananData});
    });
    return layananArr;
} 

export async function editStatus(layananId, status, session) {
    try {
      const layananRef = doc(db, 'layanan', layananId);
      await updateDoc(layananRef, {
        status: status,
        timestamp: serverTimestamp(),
        author: session.user.email, 
      });
      console.log(`Status layanan dengan ID ${layananId} berhasil diubah menjadi ${status}`);
      return true;
    } catch (error) {
      console.error('ERROR: ', error);
      return false;
    }
}


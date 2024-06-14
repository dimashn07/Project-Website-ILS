import { collection, doc, getDocs, addDoc, updateDoc, serverTimestamp, query, orderBy, runTransaction, limit} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { format } from 'date-fns';

export async function addLayanan(nama, jenisKelamin, whatsapp, email, jenisLayanan, kabupaten, puskesmas, keterangan){
    try {
      // await runTransaction(db, async(transaction) => {
        const q = query(collection(db, 'layanan'));
        const querySnapshot = await getDocs(q);
        // let lastUrutan = 0;
  
        // if(!querySnapshot.empty){
        //   const lastDoc = querySnapshot.docs[0];
        //   lastUrutan = lastDoc.data().paragraf || 0;
        // }
  
        // const newUrutan = lastUrutan + 1;
        const formattedDate = format(new Date(), 'dd MMMM yyyy');
        const docRef = await addDoc(collection(db, 'layanan'), {
          nama: nama,
          jenisKelamin: jenisKelamin,
          whatsapp: whatsapp,
          email: email,
          jenisLayanan: jenisLayanan,
          kabupaten: kabupaten,
          puskesmas: puskesmas,
          keterangan: keterangan,
          status: 'Belum Ditanggapi',
          publishedDate: formattedDate,
          timestamp: '',
        });
        console.log('Pengaduan berhasil ditambahkan dengan ID: ', docRef.id);
      // });
      return true;
    } catch(error){
      console.error('ERROR: ', error);
      return false;
    }
  }

export async function getLayanan(session){
    const layananCollection = collection(db, 'layanan');
    const querySnapshot = await getDocs(query(layananCollection, orderBy('publishedDate', 'desc')));
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


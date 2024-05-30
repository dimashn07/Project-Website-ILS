import { db } from "@/app/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, runTransaction, serverTimestamp, updateDoc } from "firebase/firestore";

export async function addMisi(deskripsi, session){
    try{
        await runTransaction(db, async(transaction) => {
            const q = query(collection(db, 'misi'), orderBy('no', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);
            let lastNumber = 0;

            if(!querySnapshot.empty){
                const lastDoc = querySnapshot.docs[0];
                lastNumber = lastDoc.data().no || 0;
            }

            const newNumber = lastNumber + 1;
            const docRef = await addDoc(collection(db, 'misi'), {
                no: newNumber,
                deskripsi: deskripsi,
                author: session.user.email,
                timestamp: serverTimestamp(),
            });
            console.log('Misi berhasil ditambahkan dengan ID: ', docRef.id);
        });
        return true;
    } catch(error){
        console.error('ERROR: ', error);
        return false;
    }
}

export async function getMisi(session){
    const misiCollection = collection(db, 'misi');
    const querySnapshot = await getDocs(query(misiCollection, orderBy('no', 'asc')));
    let misiArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const misiData = doc.data();
        misiArr.push({id: doc.id, ...misiData});
    });
    return misiArr;
}

export async function editMisi(misiId, updatedData, session){
    try{
        const misiRef = doc(db, 'misi', misiId);
        await updateDoc(misiRef, updatedData);
        console.log('Misi berhasil diubah dengan ID: ', misiId);
        return true;
    } catch(error){
        console.error('ERROR: ', error);
        return false;
    }
}

export async function deleteMisi(misiId, session){
    try{
        console.log('Hapus misi dengan ID: ', misiId);
        await deleteDoc(doc (db, 'misi', misiId));
        return misiId;
    } catch(error){
        console.error('ERROR: ', error);
        return null;
    }
}
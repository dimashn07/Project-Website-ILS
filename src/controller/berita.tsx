import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy, runTransaction, limit} from "firebase/firestore";
import { db, storage } from "@/app/firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { format } from 'date-fns';

export async function addBerita(title, content, contentImage, category, city, tags, coverImage, session){
    try {
        await runTransaction(db, async(transaction) => {
            const q = query(collection(db, 'sebaranWilayah'), orderBy('urutan', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);
            let lastUrutan = 0;
        
            if(!querySnapshot.empty){
                const lastDoc = querySnapshot.docs[0];
                lastUrutan = lastDoc.data().urutan || 0;
            }

            const formattedDate = format(new Date(), 'dd MMMM yyyy');
            const titleKeywords = title.toLowerCase().split(' ').filter(word => word !== '');
            const newUrutan = lastUrutan + 1;

            const docRef = await addDoc(collection(db, 'berita'), {
                title: title,
                content: content,
                contentImage: contentImage,
                category: category,
                city: city,
                tags: tags.split(',').map(tag => tag.trim()),
                coverImage: coverImage,
                titleKeywords: titleKeywords,
                publishedDate: formattedDate,
                author: session.user.email, 
                lastEdited: serverTimestamp(),
                urutan: newUrutan
            });
            console.log('Berita berhasil ditambahkan dengan ID: ', docRef.id);
            return true;
        });
    }catch(error){
        console.error('ERROR: ', error);
        return false;
    }
}

export async function getBerita(session){
    const beritaCollection = collection(db, 'berita');
    const querySnapshot = await getDocs(query(beritaCollection)); //, orderBy('urutan', 'asc')
    let beritaArr: {id: string}[] = [];
    querySnapshot.forEach((doc) => {
        const beritaData = doc.data();
        beritaArr.push({id: doc.id, ...beritaData});
    });
    return beritaArr;
} 

export async function editBerita(beritaId, updatedData, session){
  try {
      const beritaRef = doc(db, 'berita', beritaId);
      await updateDoc(beritaRef, updatedData);
      console.log('Berita berhasil diubah dengan ID: ', beritaId);
      return true;
  } catch(error){
      console.error('ERROR: ', error);
      return false;
  }
}

export async function deleteBerita(beritaId, contentImage, coverImage, session) {
    try {
      console.log('Hapus berita dengan ID: ', beritaId);
      await deleteDoc(doc(db, 'berita', beritaId));
  
      if(contentImage ){
        const imageRef = ref(storage, contentImage);
        await deleteObject(imageRef);
        console.log('File gambar berhasil dihapus dari penyimpanan.');
      }

      if(coverImage){
        const imageRef = ref(storage, coverImage);
        await deleteObject(imageRef);
        console.log('File gambar berhasil dihapus dari penyimpanan.');
      }

      return beritaId;
    } catch (error) {
      console.error('ERROR: ', error);
      return null;
    }
}

export async function uploadCoverImage(coverImage) {
    try {
      const storageRef = ref(storage, `coverImage/${Date.now()}-${coverImage.name}`);
      const snapshot = await uploadBytes(storageRef, coverImage);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('ERROR: ', error);
      throw error;
    }
  }
  
  export async function uploadContentImage(contentImage) {
    try {
      const storageRef = ref(storage, `contentImage/${Date.now()}-${contentImage.name}`);
      const snapshot = await uploadBytes(storageRef, contentImage);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('ERROR: ', error);
      throw error;
    }
  }

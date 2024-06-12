// import { storage, ref, uploadBytes, getDownloadURL } from '@/app/firebaseConfig';

// const uploadImageToFirebase = async (file) => {
//   const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
//   const snapshot = await uploadBytes(storageRef, file);
//   const downloadURL = await getDownloadURL(snapshot.ref);
//   return downloadURL;
// };

// export default uploadImageToFirebase;

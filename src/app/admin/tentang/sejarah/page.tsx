'use client'
import Breadcrumb from "@/components/Common/Breadcrumb";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "@/app/firebaseConfig";
import { getSejarah, addSejarah, deleteSejarah } from "../../controller/sejarah";


const SejarahPage = () => {
    const [sejarah, setSejarah] = useState<{ [key: string]: any }[]>([]);
    const [deskripsi, setDeskripsi] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const router = useRouter();

    const handleTambahClick = () => {
      router.push('sejarah/tambah');
    };
    //   e.preventDefault();
    //   if (isUpdateMode){
    //     if(selectedItem){
    //       try{
    //         const updatedSejarah = {
    //           deskripsi,
    //         };
    //         const sejarahRef = doc(db, 'sejarah', selectedItem.id);
    //         await updateDoc(sejarahRef, updatedSejarah);
  
    //         setDeskripsi('');
    //         setSelectedItem(null);
    //         setIsUpdateMode(false);
  
    //         alert('Data berhasil diubah')
    //       }catch(error){
    //         console.error('ERROR', error);
    //       }
    //     }
    //   }else{
    //     const added = await addSejarah(deskripsi);
    //     if(added){
    //       setDeskripsi('');
          
    //       alert('Data berhasil ditambahkan')
    //     }
    //   }
    // };
    // useEffect(() => {
    //   const q = query(collection(db, 'sejarah'))
    //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     let sejarahArr: { id: string }[] = [];
    
    //     querySnapshot.forEach(async (doc) => {
    //       const sejarahData = doc.data();
    //       let editedByName = ''; // Nama pengguna yang mengedit
    //       if (sejarahData.editedBy) {
    //         // Jika editedBy ada, coba ambil detail pengguna dari Firestore
    //         try {
    //           const userData = await doc.data().editedBy.get(); // Ambil detail pengguna
    //           editedByName = userData.data().name; // Ambil nama pengguna
    //         } catch (error) {
    //           console.error("Error fetching user data:", error);
    //         }
    //       }
          
    //       const sejarahItem = {
    //         ...sejarahData,
    //         id: doc.id,
    //         editedByName: editedByName
    //       };
 
    //       sejarahArr.push(sejarahItem);
    //     });
    //     setSejarah(sejarahArr);
    //   })
    
    //   return () => {
    //     unsubscribe();
    //   };
    // }, []);

    useEffect(() => {
      async function getData() {
        const sejarah = await getSejarah();
        setSejarah(sejarah);
      }
      getData();
    }, []);

    const handleUbahClick = (sejarah) => {
      router.push(`sejarah/ubah?id=${sejarah.id}`);
    };

    useEffect(() => {
      async function getData() {
        const sejarah = await getSejarah();
        setSejarah(sejarah);
      }
      getData();
    }, []);
    
    return (
      <>
        <Breadcrumb
          pageName="Sejarah"
          description="Sejarah Lembaga Inisiatif Lampung Sehat"
        />

        <div className="mx-10 mb-20 relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="justify-end">
            <a type="button" onClick={handleTambahClick} className=" cursor-pointer dark:text-gray-900 dark:bg-white border dark:border-gray-300 dark:focus:outline-none dark:hover:bg-gray-100 dark:focus:ring-4 dark:focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">
              Tambah
            </a>
          </div>
          <table className="w-full text-sm text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-0.5/5"> 
                  Paragraf
                </th>
                <th scope="col" className="px-6 py-3 w-2.5/5"> 
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3 w-1/5"> 
                  Terakhir Diperbarui
                </th>
                <th scope="col" className="px-6 py-3 w-1/5"> 
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {sejarah.map((item, index) => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index+1}
                  </td>
                  <td className="px-6 py-4 text-justify">
                    {item.deskripsi}
                  </td>
                  <td className="px-6 py-4">
                    {item.timestamp?.toDate().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 justify-center">
                    <button 
                      type="button" className="mr-2"
                      onClick={() => handleUbahClick(item)} 
                    >
                      <FontAwesomeIcon icon={faPenToSquare} size="xl" className="text-black dark:text-white" />
                    </button>
                    <button 
                      type="button" className="ml-2"
                      onClick={async () => {
                        const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus data?');
                        if (isConfirmed) {
                          const deletedSejarah = await deleteSejarah(item.id);
                          if (deletedSejarah) {
                            const updatedSejarah = sejarah.filter((t) => t.id !== deletedSejarah);
                            setSejarah(updatedSejarah);
                          }
                        }
                      }}                        
                    >
                      <FontAwesomeIcon icon={faTrash} size="xl" className="text-black dark:text-white"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
};

export default SejarahPage;
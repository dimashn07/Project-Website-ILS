'use client'
// import React from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const SejarahPage = () => {
    const [sejarah, setSejarah] = useState<{ [key: string]: any }[]>([]);

    useEffect(() => {
      const q = query(collection(db, 'sejarah'))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let sejarahArr = []
    
        querySnapshot.forEach(async (doc) => {
          const sejarahData = doc.data();
          let editedByName = ''; // Nama pengguna yang mengedit
          if (sejarahData.editedBy) {
            // Jika editedBy ada, coba ambil detail pengguna dari Firestore
            try {
              const userData = await doc.data().editedBy.get(); // Ambil detail pengguna
              editedByName = userData.data().name; // Ambil nama pengguna
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          }
          const sejarahItem = {
            ...sejarahData,
            id: doc.id,
            editedByName: editedByName // Simpan nama pengguna yang terakhir kali mengedit entri
          };
          sejarahArr.push(sejarahItem);
        });
        setSejarah(sejarahArr);
      })
    
      return () => {
        unsubscribe();
      };
    }, []);

    return (
      <>
        <Breadcrumb
          pageName="Sejarah"
          description="Sejarah Lembaga Inisiatif Lampung Sehat"
        />

        <div className="mx-10 mb-20 relative overflow-x-auto shadow-md sm:rounded-lg">
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
              {sejarah.map((item) => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-justify">
                    {item.deskripsi}
                  </td>
                  <td className="px-6 py-4">
                    {item.editedByName}
                  </td>
                  <td className="px-6 py-4 justify-center">
                    <a href="sejarah/ubah" className="mr-2">
                      <FontAwesomeIcon icon={faPenToSquare} size="xl" className="text-black dark:text-white" />
                    </a>
                    <button type="submit" className="ml-2">
                      <FontAwesomeIcon icon={faTrash} size="xl" className="text-black dark:text-white"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      
        {/* <section className="pb-[50px] pt-[10px]">
          <div className="container">
            <table>
              <th>Paragraf</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </table>
            <div className="mx-4 max-w-1.5x1.5">
              {sejarah.map((sejarah) => (
                <div key={sejarah.id} className="text-lg text-justify mb-8">
                  {sejarah.deskripsi}
                </div>
              ))}
            </div>
          </div>
        </section> */}
      </>
    );
};

export default SejarahPage;
'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { deleteVisi, getVisi } from "../../controller/visi";
import { deleteMisi, getMisi } from "../../controller/misi";

const VisiMisiPage = () => { 

    const [visi, setVisi] = useState<{ [key: string]: any }[]>([]);
    const [misi, setMisi] = useState<{ [key: string]: any }[]>([]);


    const router = useRouter();

    const handleTambahClick = () => {
      router.push('visi-misi/tambah');
    }

    const handleUbahVisiClick = (visi) => {
      router.push(`visi-misi/ubah-visi?id=${visi.id}`);
    }

    const handleUbahMisiClick = (misi) => {
      router.push(`visi-misi/ubah-misi?id=${misi.id}`);
    }

    useEffect(() => {
      async function getData() {
        const visi = await getVisi();
        const misi = await getMisi();
        setVisi(visi);
        setMisi(misi);
      }
      getData();
    }, []);

    return (
        <>
          <Breadcrumb
            pageName="Visi Misi"
            description="Visi dan Misi Lembaga Inisiatif Lampung Sehat"
          />
  
          <div className="mx-10 mb-20 relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end mb-2">
              <a type="button" onClick={handleTambahClick} className=" cursor-pointer dark:text-gray-900 dark:bg-white border dark:border-gray-300 dark:focus:outline-none dark:hover:bg-gray-100 dark:focus:ring-4 dark:focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">
                Tambah
              </a>
            </div>
            <table className="w-full text-sm text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th colSpan={3} className="px-6 py-3 text-center text-lg border-b leading-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                    Visi
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3 w-3/5"> 
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
                {visi.map((item) => (
                  <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 text-center">
                      {item.deskripsi}
                    </td>
                    <td className="px-6 py-4">
                      {item.timestamp?.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 justify-center">
                      <button 
                        type="button" className="mr-2"
                        onClick={() => handleUbahVisiClick(item)} 
                      >
                        <FontAwesomeIcon icon={faPenToSquare} size="xl" className="text-black dark:text-white" />
                      </button>
                      <button 
                        type="button" className="ml-2"   
                        onClick={async () => {
                          const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus data?');
                          if (isConfirmed) {
                            const deletedVisi = await deleteVisi(item.id);
                            if (deletedVisi) {
                              const updatedVisi = visi.filter((t) => t.id !== deletedVisi);
                              setVisi(updatedVisi);
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
            <table className="w-full text-sm text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th colSpan={4} className="px-6 py-3 text-center text-lg border-b leading-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                    Misi
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="px-6 py-3 w-0.5/5"> 
                    No
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
                {misi.map((item, index) => (
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
                            onClick={() => handleUbahMisiClick(item)} 
                        >
                            <FontAwesomeIcon icon={faPenToSquare} size="xl" className="text-black dark:text-white" />
                        </button>
                        <button 
                            type="button" className="ml-2"
                            onClick={async () => {
                              const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus data?');
                              if (isConfirmed) {
                                const deletedMisi = await deleteMisi(item.id);
                                if (deletedMisi) {
                                  const updatedMisi = misi.filter((t) => t.id !== deletedMisi);
                                  setMisi(updatedMisi);
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
}

export default VisiMisiPage;
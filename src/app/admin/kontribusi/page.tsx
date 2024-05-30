'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { Timestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { deleteKontribusi, getKontribusi } from '@/controller/kontribusi';

const KontribusiPage = () => {
    const [kontribusi, setKontribusi] = useState<{ [key: string]: any }[]>([]);
    const { data: session } = useSession();

    const router = useRouter();

    const handleTambahClick = () => {
      router.push('admin/kontribusi/tambah');
    };

    const handleUbahClick = (kontribusi) => {
      router.push(`admin/kontribusi/ubah?id=${kontribusi.id}`);
    };

    const formatNumber = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    useEffect(() => {
      async function getData() {
        const kontribusi = await getKontribusi(session);
        setKontribusi(kontribusi);
      }
      getData();
    }, [session]);
    
    return (
      <>
      <div className='text-center'>
        <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">
          KONTRIBUSI
        </h1>
      </div>
        <div className="mx-10 mb-20 relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex justify-end mb-2">
            <a type="button" onClick={handleTambahClick} className=" cursor-pointer dark:text-gray-900 dark:bg-white border dark:border-gray-300 dark:focus:outline-none dark:hover:bg-gray-100 dark:focus:ring-4 dark:focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">
              Tambah
            </a>
          </div>
          <table className="w-full text-sm text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-0.5/5"> 
                  No
                </th>
                <th scope="col" className="px-6 py-3 w-1/5"> 
                  Jenis Capaian
                </th>
                <th scope="col" className="px-6 py-3 w-1/5"> 
                  Gambar
                </th>
                <th scope="col" className="px-6 py-3 w-0.5/5"> 
                  Jumlah
                </th>
                <th scope="col" className="px-6 py-3 w-1/5"> 
                  Keterangan
                </th>
                <th scope="col" className="px-6 py-3 w-0.5/5"> 
                  Terakhir Diperbarui
                </th>
                <th scope="col" className="px-6 py-3 w-0.5/5"> 
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {kontribusi.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">
                    {index+1}
                  </td>
                  <td className="px-6 py-4">
                    {item.jenis}
                  </td>
                  <td className="px-6 py-4">
                    <img src={item.gambar} alt="Gambar" />
                  </td>
                  <td className="px-6 py-4">
                    {formatNumber(item.jumlah)}
                  </td>
                  <td className="px-6 py-4">
                    {item.keterangan}
                  </td>
                  <td className="px-6 py-4">
                    {item.timestamp?.toDate().toLocaleDateString()} <br />
                    {item.author}
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
                          const deletedKontribusi = await deleteKontribusi(item.id, item.gambar, session);
                          if (deletedKontribusi) {
                            const updatedSejarah = kontribusi.filter((t) => t.id !== deletedKontribusi);
                            setKontribusi(updatedSejarah);
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

export default KontribusiPage;
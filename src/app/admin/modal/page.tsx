'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { deleteModal, getModals } from '@/controller/modal';

const ModalPage = () => {
    const [modal, setModal] = useState<{ [key: string]: any }[]>([]);
    const { data: session } = useSession();

    const router = useRouter();

    const handleTambahClick = () => {
      router.push('admin/modal/tambah');
    };

    const handleUbahClick = (modal) => {
      router.push(`admin/modal/ubah?id=${modal.id}`);
    };

    const formatNumber = (num) => {
      if (num === undefined || num === null) {
        return '0';
      }
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    useEffect(() => {
      async function getData() {
        const modal = await getModals(session);
        setModal(modal);
      }
      getData();
    }, [session]);
    
    return (
      <>
      <div className='text-center'>
        <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">
          MODAL
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
                <th scope="col" className="px-6 py-3 w-1.5/5"> 
                  Gambar
                </th>
                <th scope="col" className="px-6 py-3 w-2/5"> 
                  Deskripsi
                </th>
                <th scope="col" className="px-6 py-3 w-0.5/5"> 
                  Terakhir Diperbarui
                </th>
                <th scope="col" className="px-6 py-3 w-1/5"> 
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {modal.map((item) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">
                    <img src={item.gambar} alt="Gambar" />
                  </td>
                  <td className="px-6 py-4 text-justify">
                    {item.deskripsi}
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
                          const deletedModal = await deleteModal(item.id, item.gambar, session);
                          if (deletedModal) {
                            const updatedModal = modal.filter((t) => t.id !== deletedModal);
                            setModal(updatedModal);
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

export default ModalPage;
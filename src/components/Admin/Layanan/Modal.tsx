'use client';
import { doc, getDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { db } from '@/app/firebaseConfig';
import { editStatus } from '@/controller/layanan';

export default function LayananModal({ layananItem }) {
  const { data: session } = useSession();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState<{ [key: string]: any } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const toggleModal = (layananItem: { [key: string]: any } | null = null) => {
    setSelectedLayanan(layananItem);
    setModalVisible(!modalVisible);
  };
  

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleEditStatus = async (layananId: number, status: string) => {
    try {
      const updated = await editStatus(layananId, status, session);
      if (updated) {
        setSelectedLayanan((prevLayanan) => ({ ...prevLayanan, status }));
        console.log(`Status layanan dengan ID ${layananId} berhasil diubah menjadi ${status}`);
      } else {
        console.log(`Gagal mengubah status layanan dengan ID ${layananId}`);
      }
    } catch (error) {
      console.error('ERROR: ', error);
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [selectedLayanan?.keterangan]);

  const fetchLayananData = async (id: string) => {
    const docRef = doc(db, 'layanan', id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setSelectedLayanan({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.error('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const layananId = layananItem?.id;
    if(layananId){
        fetchLayananData(layananId);
    }
  }, [layananItem]);

  return (
    <>
      <button
        onClick={() => toggleModal(layananItem)}
        className="text-black dark:text-white font-semibold hover:underline"
      >
        Lihat
      </button>

      {modalVisible && selectedLayanan && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Rincian Pengaduan
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => toggleModal(null)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 text-left">
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="nama"
                      className="mb-2 block text-sm font-medium text-dark dark:text-white"
                    >
                      Nama 
                    </label>
                    <input
                      type="text" id="nama" name="nama" readOnly
                      value={selectedLayanan?.nama || ''}
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="jenisKelamin"
                        className="mb-2 block text-sm font-medium text-dark dark:text-white"
                      >
                        Jenis Kelamin
                      </label>
                      <div className="relative">
                        <input
                          type="text" id="jenisKelamin" name="jenisKelamin" readOnly
                          value={selectedLayanan?.jenisKelamin || ''}
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="jenisLayanan"
                        className="mb-2 block text-sm font-medium text-dark dark:text-white"
                      >
                        Jenis Layanan
                      </label>
                      <div className="relative">
                        <input
                          type="text" id="jenisLayanan" name="jenisLayanan" readOnly
                          value={selectedLayanan?.jenisLayanan || ''}
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-dark dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email" id="email" name="email" readOnly
                        value={selectedLayanan?.email || ''}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="mb-2 block text-sm font-medium text-dark dark:text-white"
                      >
                        No. Whatsapp
                      </label>
                      <input
                        type="text" id="whatsapp" name="whatsapp" readOnly
                        value={selectedLayanan?.whatsapp || ''}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="keterangan"
                      className="mb-2 block text-sm font-medium text-dark dark:text-white"
                    >
                      Keterangan
                    </label>
                    <textarea
                      id="keterangan" name="keterangan" readOnly
                      value={selectedLayanan?.keterangan || ''}
                      ref={textareaRef}
                      rows={1}
                      className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      onChange={autoResizeTextarea}
                    ></textarea>
                  </div>
                  <div className='mb-4'>
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-medium text-dark dark:text-white"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={selectedLayanan?.status || ''}
                      onChange={(e) => handleEditStatus(selectedLayanan?.id, e.target.value)}
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    >
                      <option value="Belum Ditanggapi">Belum Ditanggapi</option>
                      <option value="Ditanggapi">Ditanggapi</option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

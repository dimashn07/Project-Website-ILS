'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { deletePengurusILS, getPengurusILS } from '@/controller/pengurusILS';

const StrukturOrganisasiPage = () => {
    const [pengurusILS, setPengurusILS] = useState<{ [key: string]: any }[]>([]);
    const { data: session } = useSession();

    const router = useRouter();

    const handleTambahClick = () => {
      router.push('struktur-organisasi/tambah');
    };

    const handleUbahClick = (pengurusILS) => {
      router.push(`struktur-organisasi/ubah?id=${pengurusILS.id}`);
    };

    useEffect(() => {
      async function getData() {
        const pengurusILS = await getPengurusILS(session);
        setPengurusILS(pengurusILS);
      }
      getData();
    }, [session]);

    const urutanKategori = ["DEWAN PENGAWAS", "SR MANAGER", "KOORDINATOR", "STAFF"];

    const pengurusILSUrut = pengurusILS.sort((a, b) => {
    return urutanKategori.indexOf(a.kategori) - urutanKategori.indexOf(b.kategori);
    });
    
    return (
      <>
      <div className='text-center'>
        <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">
          STRUKTUR ORGANISASI
        </h1>
      </div>
        <div className="mx-10 mb-20 relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex justify-end mb-2">
            <a type="button" onClick={handleTambahClick} className=" cursor-pointer dark:text-gray-900 dark:bg-white border dark:border-gray-300 dark:focus:outline-none dark:hover:bg-gray-100 dark:focus:ring-4 dark:focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">
              Tambah
            </a>
          </div>
          <table className="w-full text-sm text-center">
          {urutanKategori.map((kategori) => (
            <React.Fragment key={kategori}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th colSpan={6} className="px-6 py-3 text-center text-lg border-b leading-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                            {kategori}
                        </th>
                    </tr>
                    <tr>
                        <th scope="col" className="px-6 py-3 w-0.5/5"> 
                            No
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/5"> 
                            Nama
                        </th>
                        <th scope="col" className="px-6 py-3 w-0.5/5"> 
                            Foto
                        </th>
                        <th scope="col" className="px-6 py-3 w-1.5/5"> 
                            Jabatan
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/5"> 
                            Terakhir Diperbarui
                        </th>
                        <th scope="col" className="px-6 py-3 w-0.5/5"> 
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                {pengurusILSUrut.filter(item => item.kategori === kategori).map((item, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                            {index + 1}
                        </td>
                        <td className="px-6 py-4">
                            {item.nama}
                        </td>
                        <td className="px-6 py-4 flex justify-center">
                            <img src={item.foto} alt="Foto Pengurus" className="h-20 w-20 rounded-full" />
                        </td>
                        <td className="px-6 py-4">
                            {item.jabatan}
                        </td>
                        <td className="px-6 py-4">
                            {item.timestamp?.toDate().toLocaleDateString()} <br /> {item.author}
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
                                    const deletedPengurus = await deletePengurusILS(item.id, item.foto, session);
                                    if (deletedPengurus) {
                                    const updatedPengurusILS = pengurusILS.filter((pengurus) => pengurus.id !== deletedPengurus);
                                    setPengurusILS(updatedPengurusILS);
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
            </React.Fragment>
            ))}
          </table>
        </div>
      </>
    );
};

export default StrukturOrganisasiPage;
'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { deleteProgram, getPrograms } from '@/controller/program';

const ProgramPage = () => {
  const [programs, setPrograms] = useState<{ [key: string]: any }[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleTambahClick = () => {
    router.push('admin/program/tambah');
  };

  const handleUbahClick = (program) => {
    router.push(`admin/program/ubah?id=${program.id}`);
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      if (session) {
        const programData = await getPrograms(session);
        setPrograms(programData);
      }
    };
    fetchPrograms();
  }, [session]);

  const handleDelete = async (id, gambar) => {
    const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus data?');
    if (isConfirmed) {
      const deletedProgramId = await deleteProgram(id, gambar, session);
      if (deletedProgramId) {
        setPrograms(programs.filter((program) => program.id !== deletedProgramId));
      }
    }
  };

  return (
    <>
      <div className='text-center'>
        <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">
          PROGRAM
        </h1>
      </div>
      <div className="mx-10 mb-20 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={handleTambahClick}
            className="cursor-pointer dark:text-gray-900 dark:bg-white border dark:border-gray-300 dark:focus:outline-none dark:hover:bg-gray-100 dark:focus:ring-4 dark:focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
          >
            Tambah
          </button>
        </div>
        <table className="w-full text-sm text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-0.5/5">No</th>
              <th scope="col" className="px-6 py-3 w-0.5/5">Nama Program</th>
              <th scope="col" className="px-6 py-3 w-1/5">Gambar</th>
              <th scope="col" className="px-6 py-3 w-1/5">Deskripsi</th>
              <th scope="col" className="px-6 py-3 w-0.5/5">Link Berita</th>
              <th scope="col" className="px-6 py-3 w-0.5/5">Terakhir Diperbarui</th>
              <th scope="col" className="px-6 py-3 w-1/5">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((item, index) => (
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.judul}</td>
                <td className="px-6 py-4"><img src={item.gambar} alt="Gambar" /></td>
                <td className="px-6 py-4">{item.deskripsi}</td>
                <td className="px-6 py-4"> <a href={item.berita}>{item.berita}</a></td>
                <td className="px-6 py-4">{item.timestamp?.toDate().toLocaleDateString()}<br />{item.author}</td>
                <td className="px-6 py-4 justify-center">
                  <button
                    type="button"
                    className="mr-2"
                    onClick={() => handleUbahClick(item)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} size="xl" className="text-black dark:text-white" />
                  </button>
                  <button
                    type="button"
                    className="ml-2"
                    onClick={() => handleDelete(item.id, item.gambar)}
                  >
                    <FontAwesomeIcon icon={faTrash} size="xl" className="text-black dark:text-white" />
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

export default ProgramPage;

'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { getDonasi } from '@/controller/donasi';

const DonasiPage = () => {
    const [donasi, setDonasi] = useState<{ [key: string]: any }[]>([]);
    const { data: session } = useSession();

    const router = useRouter();

    const handleUbahClick = (donasi) => {
      router.push(`admin/donasi/ubah?id=${donasi.id}`);
    };

    useEffect(() => {
      async function getData() {
        const donasi = await getDonasi(session);
        setDonasi(donasi);
      }
      getData();
    }, [session]);
    
    return (
      <>
      <div className='text-center'>
        <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
          DONASI
        </h1>
      </div>
        <div className="mx-10 mb-20 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-1.5/4"> 
                  Link
                </th>
                <th scope="col" className="px-6 py-3 w-1.5/4"> 
                  Terakhir Diperbarui
                </th>
                <th scope="col" className="px-6 py-3 w-1/4"> 
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {donasi.map((item) => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 text-center">
                    <a href={item.link}>{item.link}</a>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
};

export default DonasiPage;
'use client'
import React, { useState } from 'react';
import { FormTambahSejarah } from '@/components/Admin/Form/FormTambahSejarah';
import { addSejarah } from "../../../controller/sejarah";
import { useRouter } from 'next/navigation';

const TambahSejarahPage = () => {
  const [deskripsi, setDeskripsi] = useState('');

  const router = useRouter();

  const handleSimpanClick = async(e) => {
    e.preventDefault();
      const added = await addSejarah(deskripsi);
      if(added){
        setDeskripsi('');
        
        alert('Data berhasil ditambahkan')
        router.push('./');
      }
  };

  return (
    <main className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-lg w-full px-4"> 
        <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Paragraf</h1>
        <FormTambahSejarah handleSimpanClick={handleSimpanClick} deskripsi={deskripsi} setDeskripsi={setDeskripsi} />
      </div>
    </main>
  );
};

export default TambahSejarahPage;
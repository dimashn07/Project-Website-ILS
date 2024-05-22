'use client'
import React, { useState } from 'react';
import { FormSejarah } from '@/components/Admin/Form/FormSejarah';
import { addSejarah } from "../../../controller/sejarah";
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";

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
    <>
      <Breadcrumb
        pageName="Sejarah"
        description="Sejarah Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Paragraf</h1>
          <FormSejarah handleSimpanClick={handleSimpanClick} deskripsi={deskripsi} setDeskripsi={setDeskripsi} />
        </div>
      </div>
    </>
  );
};

export default TambahSejarahPage;
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { FormKontribusi } from '@/components/Admin/Form/FormKontribusi';

const TambahKontribusiPage = () => {

  const router = useRouter();

  const handleSimpanClick = async(e) => {
    alert('Data berhasil ditambahkan')
    router.push('../');
  };

  return (
    <>
    <AdminLayout>
      <Breadcrumb
        pageName="Sejarah"
        description="Sejarah Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Kontribusi</h1>
          <FormKontribusi handleSimpanClick={handleSimpanClick} deskripsi setDeskripsi />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default TambahKontribusiPage;
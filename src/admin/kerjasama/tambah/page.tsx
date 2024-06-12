'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { useSession } from 'next-auth/react';
import { addKerjasama, uploadGambar } from '@/controller/kerjasama';
import { FormKerjasama } from '@/components/Admin/Form/FormKerjasama';

const TambahKerjasamaPage = () => {
  const [instansi, setInstansi] = useState('');
  const [deskripsi, setDeskripsi] =useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const {data: session} = useSession();

  const router = useRouter();

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    try {
      if(logo){
        const logoURL = await uploadGambar(logo);
        const added = await addKerjasama(instansi, deskripsi, logoURL, session);
        if (added) {
          setInstansi('');
          setDeskripsi('');
          setLogo(null);
          
          alert('Data berhasil ditambahkan');
          router.push('/admin/pelaksana');
        }
      }else{
        alert('Tidak ada file yang dipilih');
      }
    } catch (error) {
      console.error('ERROR:', error);
      alert('Terjadi kesalahan saat menambahkan data');
    }
  };

  return (
    <>
    <AdminLayout>
      <Breadcrumb
        pageName="Kerjasama"
        description="Kerjasama Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Kerjasama</h1>
          <FormKerjasama handleSimpanClick={handleSimpanClick} mode="tambah" instansi={instansi} setInstansi={setInstansi} deskripsi={deskripsi} setDeskripsi={setDeskripsi} setLogo={setLogo} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default TambahKerjasamaPage;
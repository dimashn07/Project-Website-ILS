'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { useSession } from 'next-auth/react';
import { addModal, uploadGambar } from '@/controller/modal';
import { FormModal } from '@/components/Admin/Form/FormModal';

const TambahModalPage = () => {
  const [deskripsi, setDeskripsi] =useState('');
  const [gambar, setGambar] = useState<File | null>(null);
  const {data: session} = useSession();

  const router = useRouter();

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    try {
      if(gambar){
        const gambarURL = await uploadGambar(gambar);
        const added = await addModal(deskripsi, gambarURL, session);
        if (added) {
          setDeskripsi('');
          setGambar(null);
          
          alert('Data berhasil ditambahkan');
          router.push('../');
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
        pageName="Modal Pop-Up"
        description="Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Data Modal</h1>
          <FormModal handleSimpanClick={handleSimpanClick} mode="tambah" deskripsi={deskripsi} setDeskripsi={setDeskripsi} setGambar={setGambar} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default TambahModalPage;
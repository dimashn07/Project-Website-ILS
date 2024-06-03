'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useSession } from 'next-auth/react';
import AdminLayout from '../../layout';
import { addVideoProfil } from '@/controller/videoprofil';
import { FormVideoProfil } from '@/components/Admin/Form/FormVideoProfil';
import { uploadGambar } from '@/controller/kontribusi';

const TambahVideoProfilPage = () => {
  const [deskripsi, setDeskripsi] = useState('');
  const [link, setLink] = useState('');
  const [gambar, setGambar] = useState<File | null>(null);
  const { data: session } = useSession();

  const router = useRouter();

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    try {
      if(gambar){
        const gambarURL = await uploadGambar(gambar);
        const added = await addVideoProfil(deskripsi, link, gambarURL, session);
        if (added) {
          setDeskripsi('');
          setLink('');
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
        pageName="Video Profil"
        description="Video Profil Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Link Video</h1>
          <FormVideoProfil handleSimpanClick={handleSimpanClick} mode="tambah" deskripsi={deskripsi} setDeskripsi={setDeskripsi} videoURL={link} setVideoURL={setLink} setGambar={setGambar}/>
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default TambahVideoProfilPage;
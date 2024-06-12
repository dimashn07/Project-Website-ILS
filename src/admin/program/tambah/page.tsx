'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { useSession } from 'next-auth/react';
import { addProgram, uploadGambar } from '@/controller/program';
import { FormProgram } from '@/components/Admin/Form/FormProgram';

const TambahProgramPage = () => {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] =useState('');
  const [berita, setBerita] = useState('');
  const [gambar, setGambar] = useState<File | null>(null);
  const {data: session} = useSession();

  const router = useRouter();

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    try {
      if(gambar){
        const gambarURL = await uploadGambar(gambar);
        const added = await addProgram(judul, deskripsi, berita, gambarURL, session);
        if (added) {
          setJudul('');
          setDeskripsi('');
          setBerita('');
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
        pageName="Program"
        description="Program Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Program</h1>
          <FormProgram handleSimpanClick={handleSimpanClick} mode="tambah" judul={judul} setJudul={setJudul} deskripsi={deskripsi} setDeskripsi={setDeskripsi} beritaURL={berita} setBeritaURL={setBerita} setGambar={setGambar} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default TambahProgramPage;
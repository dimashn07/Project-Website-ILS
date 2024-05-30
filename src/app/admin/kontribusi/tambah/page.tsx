'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { FormKontribusi } from '@/components/Admin/Form/FormKontribusi';
import { addKontribusi, uploadGambar } from '@/controller/kontribusi';
import { useSession } from 'next-auth/react';

const TambahKontribusiPage = () => {
  const [jenis, setJenis] = useState('');
  const [jumlah, setJumlah] =useState('');
  const [keterangan, setKeterangan] = useState('');
  const [gambar, setGambar] = useState<File | null>(null);
  const {data: session} = useSession();

  const router = useRouter();

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    try {
      if(gambar){
        const gambarURL = await uploadGambar(gambar);
        const added = await addKontribusi(jenis, jumlah, keterangan, gambarURL, session);
        if (added) {
          setJenis('');
          setJumlah('');
          setKeterangan('');
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
        pageName="Kontribusi"
        description="Kontribusi Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Kontribusi</h1>
          <FormKontribusi handleSimpanClick={handleSimpanClick} mode="tambah" jenis={jenis} setJenis={setJenis} jumlah={jumlah} setJumlah={setJumlah} keterangan={keterangan} setKeterangan={setKeterangan} setGambar={setGambar} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default TambahKontribusiPage;
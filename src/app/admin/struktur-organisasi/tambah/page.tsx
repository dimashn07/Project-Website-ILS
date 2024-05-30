'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { useSession } from 'next-auth/react';
import { addPengurusILS, uploadFoto } from '@/controller/pengurusILS';
import { FormStrukturOrganisasi } from '@/components/Admin/Form/FormStrukturOrganisasi';

const TambahStrukturOrganisasiPage = () => {
  const [kategori, setKategori] = useState('');
  const [nama, setNama] =useState('');
  const [jabatan, setJabatan] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const {data: session} = useSession();

  const router = useRouter();

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    try {
      if(foto){
        const gambarURL = await uploadFoto(foto);
        const added = await addPengurusILS(kategori, nama, jabatan, gambarURL, session);
        if (added) {
          setKategori('');
          setNama('');
          setJabatan('');
          setFoto(null);
          
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
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Pengurus ILS</h1>
          <FormStrukturOrganisasi handleSimpanClick={handleSimpanClick} mode="tambah" kategori={kategori} setKategori={setKategori} nama={nama} setNama={setNama} jabatan={jabatan} setJabatan={setJabatan} setFoto={setFoto} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default TambahStrukturOrganisasiPage;
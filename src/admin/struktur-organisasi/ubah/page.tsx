'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { useSession } from 'next-auth/react';
import { addPengurusILS, uploadFoto } from '@/controller/pengurusILS';
import { FormStrukturOrganisasi } from '@/components/Admin/Form/FormStrukturOrganisasi';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';

const TambahStrukturOrganisasiPage = () => {
  const [kategori, setKategori] = useState('');
  const [nama, setNama] =useState('');
  const [jabatan, setJabatan] = useState('');
  const [foto, setFoto] = useState<File | null>(null);

  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
  const {data: session} = useSession();

  const router = useRouter();

  const fetchStrukturOrganisasiData = async (id: string) => {
    const docRef = doc(db, 'pengurusILS', id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setSelectedItem({ id: docSnap.id, ...docSnap.data() });
      setKategori(docSnap.data().kategori);
      setNama(docSnap.data().nama);
      setJabatan(docSnap.data().jabatan);
    } else {
      console.error('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const pengurusId = searchParams?.get('id');
    if(pengurusId){
        fetchStrukturOrganisasiData(pengurusId);
    }
  }, [searchParams]);

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    if (selectedItem && session && session.user) {
        try {
            const updatedPengurus = {
                kategori,
                nama: nama.toUpperCase(),
                jabatan,
                author: session.user.email,
                timestamp: serverTimestamp(),
            };
            const pengurusRef = doc(db, 'pengurusILS', selectedItem.id);
            await updateDoc(pengurusRef, updatedPengurus);
            setKategori(selectedItem.kategori || '');
            setNama(selectedItem.nama || '');
            setJabatan(selectedItem.jabatan || '');
            
            alert('Data berhasil ditambahkan');
            router.push('../');
        }catch (error) {
            console.error('ERROR:', error);
            alert('Terjadi kesalahan saat menambahkan data');
        }
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
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Data Pengurus ILS</h1>
          <FormStrukturOrganisasi handleSimpanClick={handleSimpanClick} mode="ubah" kategori={kategori} setKategori={setKategori} nama={nama} setNama={setNama} jabatan={jabatan} setJabatan={setJabatan} setFoto={setFoto} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default TambahStrukturOrganisasiPage;
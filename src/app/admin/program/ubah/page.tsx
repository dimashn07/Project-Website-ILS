'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { useSession } from 'next-auth/react';
import { FormProgram } from '@/components/Admin/Form/FormProgram';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';

const UbahProgramPage = () => {
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] =useState('');
  const [berita, setBerita] = useState('');
  const [gambar, setGambar] = useState<File | null>(null);

  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
  const {data: session} = useSession();

  const router = useRouter();

  const fetchProgramData = async (id: string) => {
    const docRef = doc(db, 'program', id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setSelectedItem({ id: docSnap.id, ...docSnap.data() });
      setJudul(docSnap.data().judul);
      setBerita(docSnap.data().berita);
      setDeskripsi(docSnap.data().deskripsi);
    } else {
      console.error('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const programId = searchParams?.get('id');
    if(programId){
      fetchProgramData(programId);
    }
  }, [searchParams]);

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    if (selectedItem && session && session.user) {
      try {
        const updatedProgram = {
          judul,
          deskripsi,
          berita,
          author: session.user.email,
          timestamp: serverTimestamp(),
        };
        const programRef = doc(db, 'program', selectedItem.id);
        await updateDoc(programRef, updatedProgram);
  
        setJudul(selectedItem.judul || '');
        setDeskripsi(selectedItem.deskripsi || '');
        setBerita(selectedItem.berita || '');
        setSelectedItem(null);
  
        alert('Data berhasil diubah');
        router.push('../');
      } catch (error) {
        console.error('ERROR', error);
      }
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
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Program</h1>
          <FormProgram handleSimpanClick={handleSimpanClick} mode="ubah" judul={judul} setJudul={setJudul} deskripsi={deskripsi} setDeskripsi={setDeskripsi} beritaURL={berita} setBeritaURL={setBerita} setGambar={setGambar} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default UbahProgramPage;
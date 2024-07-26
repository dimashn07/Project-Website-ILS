'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { useSession } from 'next-auth/react';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import { FormKerjasama } from '@/components/Admin/Form/FormKerjasama';

const UbahKerjasamaPage = () => {
  const [instansi, setInstansi] = useState('');
  const [deskripsi, setDeskripsi] =useState('');
  const [logo, setLogo] = useState<File | null>(null);

  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
  const {data: session} = useSession();

  const router = useRouter();

  const fetchKerjasamaData = async (id: string) => {
    const docRef = doc(db, 'kerjasama', id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setSelectedItem({ id: docSnap.id, ...docSnap.data() });
      setInstansi(docSnap.data().instansi);
      setDeskripsi(docSnap.data().deskripsi);
    } else {
      console.error('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const kerjasamaId = searchParams?.get('id');
    if(kerjasamaId){
        fetchKerjasamaData(kerjasamaId);
    }
  }, [searchParams]);

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    if (selectedItem && session && session.user) {
      try {
        const updatedKerjasama = {
          instansi,
          deskripsi,
          author: session.user.email,
          timestamp: serverTimestamp(),
        };
        const kerjasamaRef = doc(db, 'kerjasama', selectedItem.id);
        await updateDoc(kerjasamaRef, updatedKerjasama);
  
        setInstansi(selectedItem.instansi || '');
        setDeskripsi(selectedItem.deskripsi || '');
        setSelectedItem(null);
  
        alert('Data berhasil diubah');
        router.push('/admin/pelaksana');
      } catch (error) {
        console.error('ERROR', error);
      }
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
         <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Data Kerjasama</h1>
         <FormKerjasama handleSimpanClick={handleSimpanClick} mode="ubah" instansi={instansi} setInstansi={setInstansi} deskripsi={deskripsi} setDeskripsi={setDeskripsi} setLogo={setLogo} />
       </div>
     </div>
    </AdminLayout>
    </>
  );
};

export default UbahKerjasamaPage;
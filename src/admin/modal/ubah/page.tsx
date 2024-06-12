'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { useSession } from 'next-auth/react';
import { FormModal } from '@/components/Admin/Form/FormModal';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';

const UbahModalPage = () => {
  const [deskripsi, setDeskripsi] =useState('');
  const [gambar, setGambar] = useState<File | null>(null);

  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
  const {data: session} = useSession();

  const router = useRouter();

  const fetchModalData = async (id: string) => {
    const docRef = doc(db, 'modal', id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setSelectedItem({ id: docSnap.id, ...docSnap.data() });
      setDeskripsi(docSnap.data().deskripsi);
    } else {
      console.error('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const modalId = searchParams?.get('id');
    if(modalId){
      fetchModalData(modalId);
    }
  }, [searchParams]);

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    if (selectedItem && session && session.user) {
        try {
          const updatedModal = {
            deskripsi,
            author: session.user.email,
            timestamp: serverTimestamp(),
          };
          const modalRef = doc(db, 'modal', selectedItem.id);
          await updateDoc(modalRef, updatedModal);

          setDeskripsi(selectedItem.deskripsi || '');
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
        pageName="Modal Pop-Up"
        description="Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Program</h1>
          <FormModal handleSimpanClick={handleSimpanClick} mode="ubah" deskripsi={deskripsi} setDeskripsi={setDeskripsi} setGambar={setGambar} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default UbahModalPage;
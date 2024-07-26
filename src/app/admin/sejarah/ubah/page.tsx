'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormSejarah } from '@/components/Admin/Form/FormSejarah';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from "@/app/firebaseConfig";
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useSession } from 'next-auth/react';
import AdminLayout from '../../layout';

const UbahSejarahPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deskripsi, setDeskripsi] = useState('');
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
  const { data: session } = useSession();
  
  const fetchSejarahData = async(id: string) => {
    const docRef = doc(db, 'sejarah', id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      setSelectedItem({ id: docSnap.id, ...docSnap.data() });
      setDeskripsi(docSnap.data().deskripsi);
    }else{
      console.error('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const sejarahId = searchParams?.get('id');
    if(sejarahId){
      fetchSejarahData(sejarahId);
    }
  }, [searchParams]);

  const handleSimpanClick = async (e) => {
    e.preventDefault();
    if (selectedItem && session && session.user) {
      try {
        const updatedSejarah = {
          deskripsi,
          author: session.user.email,
          timestamp: serverTimestamp(),
        };
        const sejarahRef = doc(db, 'sejarah', selectedItem.id);
        await updateDoc(sejarahRef, updatedSejarah);

        setDeskripsi('');
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
        pageName="Sejarah"
        description="Sejarah Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Data Sejarah</h1>
          <FormSejarah handleSimpanClick={handleSimpanClick} deskripsi={deskripsi} setDeskripsi={setDeskripsi} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default UbahSejarahPage;

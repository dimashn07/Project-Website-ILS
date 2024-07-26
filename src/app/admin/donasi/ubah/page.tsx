'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from "@/app/firebaseConfig";
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useSession } from 'next-auth/react';
import AdminLayout from '../../layout';
import { FormDonasi } from '@/components/Admin/Form/FormDonasi';

const UbahSejarahPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [link, setLink] = useState('');
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
  const { data: session } = useSession();
  
  const fetchDonasiLink = async(id: string) => {
    const docRef = doc(db, 'donasi', id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      setSelectedItem({ id: docSnap.id, ...docSnap.data() });
      setLink(docSnap.data().link);
    }else{
      console.error('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const donasiId = searchParams?.get('id');
    if(donasiId){
      fetchDonasiLink(donasiId);
    }
  }, [searchParams]);

  const handleSimpanClick = async (e) => {
    e.preventDefault();
    if (selectedItem && session && session.user) {
      try {
        const updatedDonasi = {
          link,
          author: session.user.email,
          timestamp: serverTimestamp(),
        };
        const donasiRef = doc(db, 'donasi', selectedItem.id);
        await updateDoc(donasiRef, updatedDonasi);

        setLink('');
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
        pageName="Donasi"
        description="Donasi Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Link Donasi</h1>
          <FormDonasi handleSimpanClick={handleSimpanClick} link={link} setLink={setLink} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default UbahSejarahPage;

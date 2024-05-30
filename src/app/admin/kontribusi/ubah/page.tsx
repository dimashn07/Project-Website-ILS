'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { FormKontribusi } from '@/components/Admin/Form/FormKontribusi';
import { useSession } from 'next-auth/react';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';

const UbahKontribusiPage = () => {
  const [jenis, setJenis] = useState('');
  const [jumlah, setJumlah] =useState('');
  const [keterangan, setKeterangan] = useState('');
  const [gambar, setGambar] = useState<File>();

  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
  const {data: session} = useSession();
  const router = useRouter();

  const fetchKontribusiData = async (id: string) => {
    const docRef = doc(db, 'kontribusi', id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setSelectedItem({ id: docSnap.id, ...docSnap.data() });
      setJenis(docSnap.data().jenis);
      setJumlah(docSnap.data().jumlah);
      setKeterangan(docSnap.data().keterangan);
    } else {
      console.error('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const kontribusiId = searchParams?.get('id');
    if(kontribusiId){
      fetchKontribusiData(kontribusiId);
    }
  }, [searchParams]);

  const handleSimpanClick = async (e) => {
    e.preventDefault();
    if (selectedItem && session && session.user) {
      try {
        const updatedKontribusi = {
          jenis,
          jumlah,
          keterangan,
          author: session.user.email,
          timestamp: serverTimestamp(),
        };
        const kontribusiRef = doc(db, 'kontribusi', selectedItem.id);
        await updateDoc(kontribusiRef, updatedKontribusi);
  
        setJenis(selectedItem.jenis || '');
        setJumlah(selectedItem.jumlah || '');
        setKeterangan(selectedItem.keterangan || '');
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
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Data Kontribusi</h1>
          <FormKontribusi handleSimpanClick={handleSimpanClick} mode="ubah"  jenis={jenis} setJenis={setJenis} jumlah={jumlah} setJumlah={setJumlah} keterangan={keterangan} setKeterangan={setKeterangan} setGambar={setGambar} />

        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default UbahKontribusiPage;
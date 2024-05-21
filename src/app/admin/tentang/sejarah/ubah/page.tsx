'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormUbahSejarah } from '@/components/Admin/Form/FormUbahSejarah';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "@/app/firebaseConfig";

const UbahSejarahPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deskripsi, setDeskripsi] = useState('');
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
  useEffect(() => {
    const sejarahId = searchParams?.get('id');
    if (sejarahId) {
      fetchSejarahData(sejarahId);
    }
  }, [searchParams]);

  const fetchSejarahData = async (id: string) => {
    const docRef = doc(db, 'sejarah', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSelectedItem({ id: docSnap.id, ...docSnap.data() });
      setDeskripsi(docSnap.data().deskripsi);
    } else {
      console.error('Document not found');
    }
  };

  const handleSimpanClick = async (e) => {
    e.preventDefault();
    if (selectedItem) {
      try {
        const updatedSejarah = {
          deskripsi,
        };
        const sejarahRef = doc(db, 'sejarah', selectedItem.id);
        await updateDoc(sejarahRef, updatedSejarah);

        setDeskripsi('');
        setSelectedItem(null);

        alert('Data berhasil diubah');
        router.push('./');
      } catch (error) {
        console.error('ERROR', error);
      }
    }
  };

  return (
    <main className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-lg w-full px-4">
        <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Paragraf</h1>
        <FormUbahSejarah handleSimpanClick={handleSimpanClick} deskripsi={deskripsi} setDeskripsi={setDeskripsi} />
      </div>
    </main>
  );
};

export default UbahSejarahPage;

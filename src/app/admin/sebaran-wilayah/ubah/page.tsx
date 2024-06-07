'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { useSession } from 'next-auth/react';
import { addSebaranWilayah } from '@/controller/sebaranWilayah';
import { FormSebaranWilayah } from '@/components/Admin/Form/FormSebaranWilayah';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';

const TambahProgramPage = () => {
  const [wilayah, setWilayah] = useState('');
  const [alamat, setAlamat] =useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [maps, setMaps] = useState('');
  const {data: session} = useSession();

  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);

  const router = useRouter();

  const fetchSebaranWilayahData = async(id: string) => {
    const docRef = doc(db, 'sebaranWilayah', id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      setSelectedItem({ id: docSnap.id, ...docSnap.data() });
      setWilayah(docSnap.data().wilayah);
      setAlamat(docSnap.data().alamat);
      setLatitude(docSnap.data().latitude);
      setLongitude(docSnap.data().longitude);
      setMaps(docSnap.data().maps);
    }else{
      console.error('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const sebaranWilayahId = searchParams?.get('id');
    if(sebaranWilayahId){
        fetchSebaranWilayahData(sebaranWilayahId);
    }
  }, [searchParams]);

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    if (selectedItem && session && session.user) {
        try {
          const updatedSebaranWilayah = {
            wilayah,
            alamat,
            latitude,
            longitude,
            maps,
            author: session.user.email,
            timestamp: serverTimestamp(),
          };
          const sebaranWilayahRef = doc(db, 'sebaranWilayah', selectedItem.id);
          await updateDoc(sebaranWilayahRef, updatedSebaranWilayah);
  
          setWilayah('');
          setAlamat('');
          setLatitude('');
          setLongitude('');
          setMaps('');
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
        pageName="Sebaran Wilayah"
        description="Sebaran Wilayah Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Program</h1>
          <FormSebaranWilayah 
            handleSimpanClick={handleSimpanClick} 
            wilayah={wilayah} setWilayah={setWilayah} 
            alamat={alamat} setAlamat={setAlamat}
            latitude={latitude} setLatitude={setLatitude}
            longitude={longitude} setLongitude={setLongitude}
            maps={maps} setMaps={setMaps} />
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default TambahProgramPage;
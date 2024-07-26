'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../../layout';
import { useSession } from 'next-auth/react';
import { FormSebaranWilayah } from '@/components/Admin/Form/FormSebaranWilayah';
import { addSebaranWilayah } from '@/controller/sebaranWIlayah';

const TambahProgramPage = () => {
  const [wilayah, setWilayah] = useState('');
  const [alamat, setAlamat] =useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [maps, setMaps] = useState('');
  const {data: session} = useSession();

  const router = useRouter();

  const handleSimpanClick = async(e) => {
    e.preventDefault();
      const added = await addSebaranWilayah(wilayah, alamat, latitude, longitude, maps, session);
      if(added){
        setWilayah('');
        setAlamat('');
        setLatitude('');
        setLongitude('');
        setMaps('');
        
        alert('Data berhasil ditambahkan');
        router.push('/admin/pelaksana');
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
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Data Sebaran Wilayah</h1>
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
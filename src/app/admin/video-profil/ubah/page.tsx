'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useSession } from 'next-auth/react';
import AdminLayout from '../../layout';
import { FormVideoProfil } from '@/components/Admin/Form/FormVideoProfil';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';

const TambahVideoProfilPage = () => {
  const [deskripsi, setDeskripsi] = useState('');
  const [link, setLink] = useState('');
  const [gambar, setGambar] = useState<File>();

  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
  const { data: session } = useSession();

  const router = useRouter();

  const fetchVideoData = async(id: string) => {
    const docRef = doc(db, 'videoProfil', id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      setSelectedItem({ id: docSnap.id, ...docSnap.data() });
      setDeskripsi(docSnap.data().deskripsi);
      setLink(docSnap.data().link);
    }else{
      console.error('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const videoId = searchParams?.get('id');
    if(videoId){
        fetchVideoData(videoId);
    }
  }, [searchParams]);

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    if (selectedItem && session && session.user) {
        try {
          const updatedVideo = {
            deskripsi,
            link,
            author: session.user.email,
            timestamp: serverTimestamp(),
          };
          const videoRef = doc(db, 'videoProfil', selectedItem.id);
          await updateDoc(videoRef, updatedVideo);
  
          setDeskripsi('');
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
        pageName="Video Profil"
        description="Video Profil Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mx-10 mb-20 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full px-4"> 
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Link Video</h1>
          <FormVideoProfil handleSimpanClick={handleSimpanClick} mode="ubah" deskripsi={deskripsi} setDeskripsi={setDeskripsi} videoURL={link} setVideoURL={setLink} setGambar={setGambar}/>
        </div>
      </div>
    </AdminLayout>
    </>
  );
};

export default TambahVideoProfilPage;
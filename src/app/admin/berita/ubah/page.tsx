"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import FroalaEditor from 'react-froala-wysiwyg';
import FormBerita from '@/components/Admin/Form/FormBerita';
import AdminLayout from '../../layout';
import Breadcrumb from '@/components/Common/Breadcrumb';

const UbahBeritaPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentImage, setContentImage] = useState<File | null>(null);
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
  
  const {data: session} = useSession();
  const router = useRouter();

  const fetchBerita = async (id: string) => {
    const docRef = doc(db, 'berita', id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags.join(', '));
        setCategory(data.category);
        setCity(data.city);
        setSelectedItem({ id: docSnap.id, ...docSnap.data() });
    } else {
      console.error('Data tidak ditemukan');
      setError('Data tidak ditemukan');
    }
  };

  useEffect(() => {
    const beritaId = searchParams?.get('id');
    if(beritaId){
        fetchBerita(beritaId);
    }
  }, [searchParams]);

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    if (selectedItem && session && session.user) {
      try {
        const updatedBerita = {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            category,
            city,
            author: session.user.email,
            timestamp: serverTimestamp(),
        };

        const beritaRef = doc(db, 'berita', selectedItem.id);
        await updateDoc(beritaRef, updatedBerita);
  
        setTitle(selectedItem.title || '');
        setContent(selectedItem.content || '');
        setTags(selectedItem.tags || '');
        setCategory(selectedItem.category || '');
        setCity(selectedItem.city || '');
        setSelectedItem(null);
  
        alert('Data berhasil diubah');
        router.push('/admin/berita');
      } catch (error) {
        console.error('ERROR', error);
        setError(error.message || 'Terjadi kesalahan saat memperbarui dokumen.');
      }
    }
  };

  return (
    <AdminLayout>
      <Breadcrumb
        pageName="Berita"
        description="Berita Lembaga Inisiatif Lampung Sehat"
      />

      <main className="py-8 md:py-20 lg:py-28 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-lg w-full px-4">
          <h1 className="text-2xl text-center font-semibold mb-4">Ubah Data Berita</h1>
          <FormBerita
            handleSimpanClick={handleSimpanClick}
            mode='ubah'
            error={error}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            setContentImage={setContentImage}
            category={category}
            setCategory={setCategory}
            city={city}
            setCity={setCity}
            tags={tags}
            setTags={setTags}
            setCoverImage={setCoverImage}
            session={session}
          />
        </div>
      </main>
    </AdminLayout>
  );
};

export default UbahBeritaPage;

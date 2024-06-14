'use client'
import React, { useState } from 'react';
import FormBerita from '@/components/Admin/Form/FormBerita';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addBerita, uploadContentImage, uploadCoverImage } from '@/controller/berita';

const TambahBeritaPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentImage, setContentImage] = useState<File | null>(null);
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {data: session} = useSession();
  const router = useRouter();

  const handleSimpanClick = async(e) => {
    e.preventDefault();
    try {
      if(coverImage){
        const coverURL = await uploadCoverImage(coverImage);
        const contentURL = await uploadContentImage(contentImage);
        const added = await addBerita(title, content, contentURL, category, city, tags, coverURL, session);
        if (added) {
          setTitle('');
          setContent('');
          setContentImage(null);
          setCategory('');
          setCity('');
          setTags('');
          setCoverImage(null);
          
          alert('Data berhasil ditambahkan');
          router.push('/admin/berita');
        }
      }else{
        alert('Tidak ada file yang dipilih');
      }
    } catch (error) {
      console.error('ERROR:', error);
      alert('Terjadi kesalahan saat menambahkan data');
    }
  };

  return (
    <main className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-lg w-full px-4"> 
        <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Berita Baru</h1>
        <FormBerita
            handleSimpanClick={handleSimpanClick}
            mode='tambah'
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
  );
};

export default TambahBeritaPage;

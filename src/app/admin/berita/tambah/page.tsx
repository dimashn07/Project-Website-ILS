"use client";
import React, { useState } from 'react';
import FormBerita from '@/components/Admin/Form/FormBerita';
import { useRouter } from 'next/navigation';
import { addBerita, uploadContentImage, uploadCoverImage } from '@/controller/berita';
import { useSession } from 'next-auth/react';
import AdminLayout from '../../layout';
import Breadcrumb from '@/components/Common/Breadcrumb';

const TambahBeritaPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentImage, setContentImage] = useState(null);
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const router = useRouter();

  const handleSimpanClick = async (event) => {
    event.preventDefault();
    try {
      if (coverImage) {
        const coverURL = await uploadCoverImage(coverImage);
        if (contentImage) {
          const contentURL = await uploadContentImage(contentImage);
          const added = await addBerita(title, content, contentURL, category, city, tags, coverURL, session);
          if (added) {
            setTitle('');
            setContent('');
            setContentImage(null);
            setTags('');
            setCategory('');
            setCity('');
            setCoverImage(null);

            alert('Data berhasil ditambahkan');
            router.push('/admin/berita');
          }
        }
      } else {
        alert('Tidak ada file cover yang dipilih');
        return;
      }
    } catch (error) {
      console.error('ERROR:', error);
      setError(error.message || 'Terjadi kesalahan saat menambah dokumen.');
      alert('Terjadi kesalahan saat menambahkan data');
    }
  };

  return (
    <AdminLayout>
      <Breadcrumb
        pageName="Berita"
        description="Berita Lembaga Inisiatif Lampung Sehat"
      />
      <main className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-lg w-full px-4">
          <h1 className="text-2xl text-center font-semibold mb-4 mt-8">
            Tambah Berita
          </h1>
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
    </AdminLayout>
  );
};

export default TambahBeritaPage;

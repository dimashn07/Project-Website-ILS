"use client";
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from "next/navigation";
import { getPrograms } from '@/controller/program';
import { uploadContentImage } from '@/controller/berita';
import { getSebaranWilayah } from '@/controller/sebaranWIlayah';

// Dynamically import FroalaEditor with no SSR
const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const FormBerita = ({ handleSimpanClick, mode, error, title, setTitle, content, setContent, setContentImage, category, setCategory, city, setCity, tags, setTags, setCoverImage, session }) => {
  const [program, setProgram] = useState<{ [key: string]: any }[]>([]);
  const [sebaranWilayah, setSebaranWilayah] = useState<{ [key: string]: any }[]>([]);
  const router = useRouter();

  const handleKembaliClick = () => {
    router.push('/admin/berita');
  };

  const handleContentImageChange = async (file) => {
    try {
      const contentURL = await uploadContentImage(file);
      setContentImage(contentURL);
      return contentURL;
    } catch (error) {
      console.error('Error uploading content image:', error);
    }
  };

  const handleCoverImageChange = async (e) => {
    setCoverImage(e.target.files[0]);
  };

  useEffect(() => {
    async function fetchData() {
      const fetchedPrograms = await getPrograms(session);
      setProgram(fetchedPrograms);

      const fetchedWilayahs = await getSebaranWilayah(session);
      setSebaranWilayah(fetchedWilayahs);
    }
    fetchData();
  }, [session]);

  const editorRef = useRef<any>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={handleSimpanClick} className="max-w-lg mx-auto">
      {error && <div className="text-red-600">{error}</div>}
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Judul</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Masukkan judul berita"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="editor" className="block mb-2 text-sm font-medium text-gray-700">Konten</label>
        {typeof window !== 'undefined' && (
          <FroalaEditor
            tag='textarea'
            model={content}
            onModelChange={setContent}
            config={{
              toolbarInline: false,
              toolbarSticky: true,
              charCounterCount: false,
              placeholderText: 'Tuliskan isi berita disini...',
              imageUpload: true,
              events: {
                'image.beforeUpload': async (files) => {
                  const file = files[0];
                  try {
                    const downloadURL = await handleContentImageChange(file);
                    const editorInstance = editorRef.current; // Access the current editor instance
                    if (editorInstance) {
                      editorInstance.image.insert(downloadURL, null, null, editorInstance.image.get(), null);
                    }
                    return false;
                  } catch (error) {
                    console.error('Error uploading image:', error);
                    return false;
                  }
                },
              },
              theme: 'dark',
            }}
          />
        )}
      </div>
      <div className="mb-6">
        <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Pisahkan tag dengan koma (,)"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">Kategori</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
        >
          <option value="" disabled hidden>Pilih Kategori</option>
          {program.map(program => (
            <option key={program.id} value={program.judul}>{program.judul}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-700">Wilayah</label>
        <select
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
        >
          <option value="" disabled hidden>Pilih Wilayah</option>
          {sebaranWilayah.map(wilayah => (
            <option key={wilayah.id} value={wilayah.wilayah}>{wilayah.wilayah}</option>
          ))}
        </select>
      </div>
      {mode === 'tambah' && (
        <div className="mb-6">
          <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-700">Gambar Sampul</label>
          <input
            type="file"
            id="coverImage"
            onChange={handleCoverImageChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            ref={coverImageRef}
          />
        </div>
      )}
      <div className="flex justify-end justify-items-center">
        <span onClick={handleKembaliClick} className="cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-500 text-gray-700 border-gray-600 hover:bg-gray-300 hover:border-gray-600 focus:ring-gray-700">
          Kembali
        </span>
        <button type="submit" className="cursor-pointer dark:text-gray-900 dark:bg-white border dark:border-gray-300 dark:focus:outline-none dark:hover:bg-gray-100 dark:focus:ring-4 dark:focus:ring-gray-100 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">
          Kirim
        </button>
      </div>
    </form>
  );
};

export default FormBerita;

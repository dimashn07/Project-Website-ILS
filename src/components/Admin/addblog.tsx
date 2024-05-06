"use client"

import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
//import { Editor } from 'react-draft-wysiwyg';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const CreateBlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // Tambah state untuk gambar yang diunggah

  const handleSubmit = (event) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    console.log('Title:', title);
    console.log('Content:', contentRaw);
    console.log('Tags:', tags);
    console.log('Category:', category);
    console.log('Image:', image); // Log gambar yang diunggah
    setTitle('');
    setEditorState(EditorState.createEmpty());
    setTags('');
    setCategory('');
    setImage(null); // Reset state gambar setelah pengiriman
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Judul</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" required />
      </div>
      <div className="mb-6">
        <label htmlFor="editor" className="block mb-2 text-sm font-medium text-gray-700">Konten</label>
        <Editor
          //id="editor"
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="w-full border rounded-lg focus:outline-none focus:border-primary"
          editorClassName="p-4"
          toolbarClassName="border-t"
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image'],
            inline: { inDropdown: false },
            list: { inDropdown: false },
            textAlign: { inDropdown: false },
            link: { inDropdown: false },
            history: { inDropdown: false },
            image: { uploadCallback: handleImageChange, alt: { present: true, mandatory: true } },
          }}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-700">Tags</label>
        <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Pisahkan tag dengan koma (,)" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
      </div>
      <div className="mb-6">
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">Kategori</label>
        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
      </div>
      <button type="submit" className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-opacity-90">Kirim Berita</button>
    </form>
  );
};

export default CreateBlogPostForm;


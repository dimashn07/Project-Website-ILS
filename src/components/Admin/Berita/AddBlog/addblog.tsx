// "use client"

// import React, { useState, useRef } from 'react';
// import FroalaEditor from 'react-froala-wysiwyg';
// import 'froala-editor/css/froala_editor.pkgd.min.css';
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/js/plugins.pkgd.min.js';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import addData from "./addData";
// import getNextId from './getNextId';
// import { format } from 'date-fns';
// import uploadImageToFirebase from './uploadImage';

// const CreateBlogPostForm = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [tags, setTags] = useState('');
//   const [category, setCategory] = useState('');
//   const [error, setError] = useState(null);
//   const [imageURL, setImageURL] = useState('');

//   const editorRef = useRef(null);

//   const handleImageUpload = async (file) => {
//     try {
//       const downloadURL = await uploadImageToFirebase(file);
//       setImageURL(downloadURL);
//       return downloadURL;
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw new Error('Failed to upload image');
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formattedDate = format(new Date(), 'dd MMMM yyyy');

//     // Data yang akan ditambahkan ke Firebase
//     const data = {
//       title: title,
//       content: content,
//       tags: tags.split(',').map(tag => tag.trim()), // Pisahkan tag dengan koma dan hapus spasi di sekitarnya
//       category: category,
//       createdAt: formattedDate,
//       image: imageURL,
//     };

//     try {
//       const newId = await getNextId();
//       await addData('blogPosts', newId.toString(), data);
//       console.log('Document added successfully!');
//       // Reset semua state setelah pengiriman berhasil
//       setTitle('');
//       setContent('');
//       setTags('');
//       setCategory('');
//       setImageURL('');
//       setError(null);
//     } catch (e) {
//       console.error('Error adding document: ', e);
//       setError(e.message || 'Terjadi kesalahan saat menambahkan dokumen.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
//       {error && <div className="text-red-600">{error}</div>}
//       <div className="mb-6">
//         <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Judul</label>
//         <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" required />
//       </div>
//       <div className="mb-6">
//         <label htmlFor="editor" className="block mb-2 text-sm font-medium text-gray-700">Konten</label>
//         <FroalaEditor
//           tag='textarea'
//           model={content}
//           onModelChange={setContent}
//           config={{
//             toolbarInline: false,
//             toolbarSticky: true,
//             charCounterCount: false,
//             placeholderText: 'Tuliskan isi berita disini...',
//             imageUpload: true,
//             //imageUploadURL: 'http://localhost:3000/api/upload-image',
//             events: {
//               'image.beforeUpload': async (files) => {
//                 const file = files[0];
//                 try {
//                   const downloadURL = await handleImageUpload(file);
//                   if (editorRef.current) {
//                     const editor = editorRef.current.getEditor();
//                     editor.image.insert(downloadURL, null, null, editor.image.get(), null);
//                   }
//                   return false;
//                 } catch (error) {
//                   console.error('Error uploading image:', error);
//                   return false;
//                 }
//               },
//             },
//             theme: 'dark',
//           }}
//           ref={editorRef}
//         />
//       </div>
//       <div className="mb-6">
//         <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-700">Tags</label>
//         <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Pisahkan tag dengan koma (,)" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
//       </div>
//       <div className="mb-6">
//         <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">Kategori</label>
//         <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
//       </div>
//       <button type="submit" className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-opacity-90">Kirim Berita</button>
//     </form>
//   );
// };

// export default CreateBlogPostForm;

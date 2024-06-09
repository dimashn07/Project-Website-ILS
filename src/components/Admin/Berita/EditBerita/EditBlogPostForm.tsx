import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { db } from '@/app/firebaseConfig';
import uploadImageToFirebase from '../AddBlog/uploadImage';

const EditBlogPostForm = ({ id }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');
    const [submenu, setSubmenu] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [imageURL, setImageURL] = useState('');
    const [coverImageURL, setCoverImageURL] = useState('');
    const [coverImageName, setCoverImageName] = useState('');

    const editorRef = useRef<FroalaEditor | null>(null);
    const coverImageRef = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchBlogPost = async () => {
            const docRef = doc(db, 'blogPosts', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setTitle(data.title);
                setContent(data.content);
                setTags(data.tags.join(', '));
                setCategory(data.category);
                setSubmenu(data.submenu);
                setImageURL(data.image);
                setCoverImageURL(data.coverImage);
                setCoverImageName(data.coverImageName || '');
            } else {
                setError('Document not found');
            }
        };

        fetchBlogPost();
    }, [id]);

    const handleImageUpload = async (file) => {
        try {
            const downloadURL = await uploadImageToFirebase(file);
            setImageURL(downloadURL);
            return downloadURL;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    };

    const handleCoverImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const downloadURL = await uploadImageToFirebase(file);
                setCoverImageURL(downloadURL);
                setCoverImageName(file.name); 
            } catch (error) {
                console.error('Error uploading cover image:', error);
                throw new Error('Failed to upload cover image');
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            category,
            submenu,
            coverImage: coverImageURL || coverImageRef.current?.value, 
            coverImageName: coverImageName, 
        };

        try {
            const docRef = doc(db, 'blogPosts', id);
            await updateDoc(docRef, data);
            console.log('Document updated successfully!');
            
            if (searchParams) {
                router.push('/blog');
            } else {
                console.error('searchParams is null or undefined');
                setError('Navigational parameter is not set.');
            }
        } catch (e) {
            console.error('Error updating document: ', e);
            setError(e.message || 'Terjadi kesalahan saat memperbarui dokumen.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            {error && <div className="text-red-600">{error}</div>}
            <div className="mb-6">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Judul</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" required />
            </div>
            <div className="mb-6">
                <label htmlFor="editor" className="block mb-2 text-sm font-medium text-gray-700">Konten</label>
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
                                    const downloadURL = await handleImageUpload(file);
                                    if (editorRef.current) {
                                        const editor = editorRef.current.getEditor();
                                        editor.image.insert(downloadURL, null, null, editor.image.get(), null);
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
                    ref={editorRef}
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
            <div className="mb-6">
                <label htmlFor="submenu" className="block mb-2 text-sm font-medium text-gray-700">Submenu</label>
                <select id="submenu" value={submenu} onChange={(e) => setSubmenu(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary">
                    <option value="" disabled hidden>Pilih Submenu</option>
                    <option value="Eliminasi TB">Eliminasi TB</option>
                    <option value="UMKM">UMKM</option>
                    <option value="Layanan Kesehatan Publik">Layanan Kesehatan Publik</option>
                    <option value="Berita Lainnya">Berita Lainnya</option>
                </select>
            </div>
            <div className="mb-6">
                <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-700">Gambar Sampul</label>
                {coverImageName && (
                    <div className="mb-2">
                        <p className="text-gray-600 mb-2">Current file: {coverImageName}</p>
                        <img src={coverImageURL} alt="Cover" className="max-w-full h-auto" />
                    </div>
                )}
                <input type="file" id="coverImage" onChange={handleCoverImageUpload} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" ref={coverImageRef} />
            </div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-opacity-90">Perbarui Berita</button>
        </form>
    );
};

export default EditBlogPostForm;


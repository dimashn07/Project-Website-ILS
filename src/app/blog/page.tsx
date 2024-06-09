"use client"

import React, { useEffect, useState } from 'react';
import SingleBlog from "@/components/Berita/SingleBlog";
import { collection, onSnapshot, query, deleteDoc, doc, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { BlogType } from "@/types/blog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from 'next/link';

interface blogList {
  id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  publishDate: string;
  category: string;
  submenu: string;
}

const Blog = () => {
  const [blogPosts, setBlog] = useState<BlogType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedSubmenu, setSelectedSubmenu] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const postsPerPage = 3;

  useEffect(() => {
    const q = query(collection(db, 'blogPosts'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogs: BlogType[] = [];

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const blogData = doc.data() as blogList;
        blogs.push({ ...blogData, id: doc.id });
      });

      // Sort by ID in descending order
      const sortedBlogs = blogs.sort((a, b) => b.id.localeCompare(a.id));
      setBlog(sortedBlogs);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (selectedSubmenu === 'All') {
      setCategories([]);
      setTags([]);
    } else {
      const submenuCategories = new Set<string>();
      const submenuTags = new Set<string>();

      blogPosts.forEach((post) => {
        if (post.submenu === selectedSubmenu) {
          submenuCategories.add(post.category);
          post.tags.forEach((tag) => submenuTags.add(tag));
        }
      });

      setCategories(Array.from(submenuCategories));
      setTags(Array.from(submenuTags));
    }

    setSelectedCategory('All');
    setSelectedTag('All');
  }, [selectedSubmenu, blogPosts]);

  // Handle submenu change
  const handleSubmenuChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubmenu(event.target.value);
    setCurrentPage(1);
  };

  // Handle category change
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  // Handle tag change
  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blogPosts', id));
      console.log('Document deleted successfully!');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const filteredBlogPosts = blogPosts.filter(post => {
    return (
      (selectedSubmenu === 'All' || post.submenu === selectedSubmenu) &&
      (selectedCategory === 'All' || post.category === selectedCategory) &&
      (selectedTag === 'All' || post.tags.includes(selectedTag))
    );
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Breadcrumb pageName="Berita" description="" />

      <section className="pt-[60px] lg:pt-[80px] pb-[60px] lg:pb-[100px] relative z-10 overflow-hidden">
        <div className="container">
          <div className="flex justify-between mb-8">
            <div className="flex flex-col">
              <label className="mb-2">Submenu</label>
              <select value={selectedSubmenu} onChange={handleSubmenuChange} className="px-4 py-2 border rounded-lg">
                <option value="All">All</option>
                <option value="Eliminasi TB">Eliminasi TB</option>
                <option value="UMKM">UMKM</option>
                <option value="Layanan Kesehatan Publik">Layanan Kesehatan Publik</option>
                <option value="Berita Lainnya">Berita Lainnya</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Kategori</label>
              <select value={selectedCategory} onChange={handleCategoryChange} className="px-4 py-2 border rounded-lg">
                <option value="All">All</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Tag</label>
              <select value={selectedTag} onChange={handleTagChange} className="px-4 py-2 border rounded-lg">
                <option value="All">All</option>
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            {currentPosts.map((blog) => (
              <div key={blog.id} className="w-full md:w-1/2 lg:w-1/3 px-4">
                <SingleBlog blog={blog} />
                <div className="flex mt-4">
                  <Link href={`/edit/${blog.id}`}>
                    <button className="mr-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Edit</button>
                  </Link>
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-32">
            <button
              onClick={() => setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage)}
              className={`mx-1 px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-700' : 'bg-primary text-white'}`}
            >
              Prev
            </button>
            {Array.from({ length: Math.ceil(filteredBlogPosts.length / postsPerPage) }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`mx-1 px-3 py-1 rounded-lg ${currentPage === number ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prevPage => prevPage < Math.ceil(filteredBlogPosts.length / postsPerPage) ? prevPage + 1 : prevPage)}
              className={`mx-1 px-3 py-1 rounded-lg ${currentPage === Math.ceil(filteredBlogPosts.length / postsPerPage) ? 'bg-gray-200 text-gray-700' : 'bg-primary text-white'}`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

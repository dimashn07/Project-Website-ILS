"use client";

import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteBerita } from "@/controller/berita";
import SingleBerita from "@/components/Admin/Berita/SingleBlog";
import AdminLayout from "../layout";

const Blog = () => {
  const [berita, setBerita] = useState<{ [key: string]: any }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const postsPerPage = 9;

  const { data: session } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (session) {
      const q = query(collection(db, 'berita'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const blogs: { id: string, categories: string, cities: string, tags: string[] }[] = []; 
  
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const blogData = doc.data();
            blogs.push({...blogData, id: doc.id, categories: blogData.category, cities: blogData.city, tags: blogData.tags });
        });
    
        const sortedBlogs = blogs.sort((a, b) => b.id.localeCompare(a.id));
        setBerita(sortedBlogs);
        });
        
        return () => {
        unsubscribe();
      };
    }
  }, [session]);

  useEffect(() => {
    const fetchCategories = () => {
      const q = query(collection(db, 'program'));
      const unsubscribeCategories = onSnapshot(q, (querySnapshot) => {
        let categoriesArr: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          categoriesArr.push(data.judul); 
        });
        setCategories(categoriesArr);
      });
      return unsubscribeCategories;
    };
  
    const fetchCities = () => {
      const q = query(collection(db, 'sebaranWilayah'));
      const unsubscribeCities = onSnapshot(q, (querySnapshot) => {
        let citiesArr: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          citiesArr.push(data.wilayah);
        });
        setCities(citiesArr);
      });
      return unsubscribeCities;
    };
  
    const fetchTags = () => {
      const q = query(collection(db, 'berita'));
      const unsubscribeTags = onSnapshot(q, (querySnapshot) => {
        let tagsArr: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          tagsArr.push(...data.tags);
        });
        setTags(tagsArr);
      });
      return unsubscribeTags;
    };
  
    const unsubscribeCategories = fetchCategories();
    const unsubscribeCities = fetchCities();
    const unsubscribeTags = fetchTags();
  
    return () => {
      unsubscribeCategories();
      unsubscribeCities();
      unsubscribeTags();
    };
  }, []);

  const handleUbahClick = (berita) => {
    router.push(`berita/ubah?id=${berita.id}`);
  };

  const handleTambahClick = () => {
    router.push('berita/tambah');
  };
  
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setCurrentPage(1);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
    setCurrentPage(1);
  };

  const filteredBerita = berita.filter((post) => {
    return (
      (selectedCategory === "All" || post.categories.includes(selectedCategory)) &&
      (selectedCity === "All" || post.cities === selectedCity) &&
      (selectedTag === "All" || post.tags.includes(selectedTag))
    );
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBerita.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
    <AdminLayout>
      <Breadcrumb 
        pageName="Berita" 
        description="Berita Lembaga Inisiatif Lampung Sehat" 
      />

      <section className="pt-[40px] lg:pt-[40px] pb-[60px] lg:pb-[100px] relative z-10 overflow-hidden">
        <div className="container">
          <div className="flex justify-between mb-8 mx-60">
            <div className="flex flex-col">
              <label className="mb-2">Kategori</label>
              <select value={selectedCategory} onChange={handleCategoryChange} className="px-4 py-2 border rounded-lg">
                <option value="All">Semua</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Wilayah</label>
              <select value={selectedCity} onChange={handleCityChange} className="px-4 py-2 border rounded-lg">
                <option value="All">Semua</option>
                {cities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Tag</label>
              <select value={selectedTag} onChange={handleTagChange} className="px-4 py-2 border rounded-lg">
                <option value="All">Semua</option>
                {tags.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end mb-2">
            <button
                type="button"
                onClick={handleTambahClick}
                className="cursor-pointer bg-primary border dark:border-gray-300 dark:focus:outline-none dark:hover:bg-gray-100 dark:focus:ring-4 dark:focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
            >
                Tambah Berita
            </button>
          </div>
          <div className="flex flex-wrap -mx-4">
            {currentPosts.map((item) => (
              <div key={item.id} className="w-full md:w-1/2 lg:w-1/3 px-4">
                <SingleBerita berita={item} />
                <div className="flex mt-2 justify-end">
                    <button 
                        className="mr-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        onClick={() => handleUbahClick(item)} 
                    >
                        <FontAwesomeIcon icon={faPenToSquare} size="xl" className="text-black dark:text-white" />
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                        onClick={async () => {
                            const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus data?');
                            if (isConfirmed) {
                              const deletedBerita = await deleteBerita(item.id,  item.contentImage, item.coverImage, session);
                              if (deletedBerita) {
                                const updatedBerita = berita.filter((t) => t.id !== deletedBerita);
                                setBerita(updatedBerita);
                              }
                            }
                        }}     
                    >
                        <FontAwesomeIcon icon={faTrash} size="xl" className="text-black dark:text-white"/>
                    </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-32">
            <button
              onClick={() => setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))}
              className={`mx-1 px-3 py-1 rounded-lg ${currentPage === 1 ? "bg-gray-200 text-gray-700" : "bg-primary text-white"}`}
            >
              Prev
            </button>
            {Array.from({ length: Math.ceil(filteredBerita.length / postsPerPage) }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`mx-1 px-3 py-1 rounded-lg ${currentPage === number ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prevPage) => (prevPage < Math.ceil(filteredBerita.length / postsPerPage) ? prevPage + 1 : prevPage))}
              className={`mx-1 px-3 py-1 rounded-lg ${currentPage === Math.ceil(filteredBerita.length / postsPerPage) ? "bg-gray-200 text-gray-700" : "bg-primary text-white"}`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </AdminLayout>
    </>
  );
};

export default Blog;

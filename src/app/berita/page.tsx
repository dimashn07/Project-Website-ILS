"use client";

import React, { useEffect, useState } from "react";
// import SingleBlog from "@/components/Berita/SingleBlog";
import { collection, onSnapshot, query, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SingleBerita from "@/components/Admin/Berita/SingleBlog";

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

  useEffect(() => {
    const q = query(collection(db, "berita"));
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
  }, []);

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
      <Breadcrumb 
        pageName="Berita" 
        description="Berita Lembaga Inisiatif Lampung Sehat" 
      />

      <section className="pt-[60px] lg:pt-[80px] pb-[60px] lg:pb-[100px] relative z-10 overflow-hidden">
        <div className="container">
          <div className="flex justify-between mb-8">
            <div className="flex flex-col">
              <label className="mb-2">Kategori</label>
              <select value={selectedCategory} onChange={handleCategoryChange} className="px-4 py-2 border rounded-lg">
                <option value="All">All</option>
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
                <option value="All">All</option>
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
                <option value="All">All</option>
                {tags.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            {currentPosts.map((item) => (
              <div key={item.id} className="w-full md:w-1/2 lg:w-1/3 px-4">
                <SingleBerita berita={item} />
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
    </>
  );
};

export default Blog;

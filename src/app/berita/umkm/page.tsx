"use client"

import React, { useEffect, useState } from 'react';
import SingleBlog from "@/components/Berita/SingleBlog";
import { collection, onSnapshot, query, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import Breadcrumb from "@/components/Common/Breadcrumb";

const BlogUMKM = () => {
  const [berita, setBerita] = useState<{ [key: string]: any }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState<string>("Semua");
  const [selectedTag, setSelectedTag] = useState<string>("Semua");
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
      const filteredByCategory = sortedBlogs.filter(berita => berita.categories === 'UMKM');
      setBerita(filteredByCategory);

      const uniqueCities = Array.from(new Set(filteredByCategory.flatMap(berita => berita.cities)));
      setCities(['Semua',...uniqueCities]);

      const uniqueTags = Array.from(new Set(filteredByCategory.flatMap(berita => berita.tags)));
      setTags(['Semua',...uniqueTags]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setCurrentPage(1);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
    setCurrentPage(1);
  };

  let filteredPosts = berita;

  if (selectedCity!== 'Semua') {
    filteredPosts = filteredPosts.filter(berita => berita.cities === selectedCity);
  }

  if (selectedTag!== 'Semua') {
    filteredPosts = filteredPosts.filter(berita => berita.tags.includes(selectedTag));
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Breadcrumb
        pageName="Berita UMKM"
        description="Berita UMKM Lembaga Inisiatif Lampung Sehat"
      />

      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          
          <div className="mb-8 flex justify-center">
            <div className="mr-4">
              <label htmlFor="cityDropdown" className="mr-2 text-body-color">Wilayah</label>
              <select
                id="cityDropdown"
                value={selectedCity}
                onChange={handleCityChange}
                className="px-4 py-2 rounded bg-body-color bg-opacity-[15%] text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tagDropdown" className="mr-2 text-body-color">Tag</label>
              <select
                id="tagDropdown"
                value={selectedTag}
                onChange={handleTagChange}
                className="px-4 py-2 rounded bg-body-color bg-opacity-[15%] text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap justify-center">
            {currentPosts.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
               <SingleBlog berita={blog} />
              </div>
            ))}
          </div>

          <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
            <div className="w-full px-4">
              <ul className="flex items-center justify-center pt-8">
                <li className="mx-1">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition ${currentPage!== 1? "hover:bg-primary hover:bg-opacity-100 hover:text-white" : "cursor-not-allowed"}`}
                  >
                    Prev
                  </button>
                </li>
                {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
                  <li key={i + 1} className="mx-1">
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition ${currentPage === i + 1? "bg-primary text-white" : "hover:bg-primary hover:bg-opacity-100 hover:text-white"}`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className="mx-1">
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                    className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition ${currentPage!== Math.ceil(filteredPosts.length / postsPerPage)? "hover:bg-primary hover:bg-opacity-100 hover:text-white" : "cursor-not-allowed"}`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogUMKM;
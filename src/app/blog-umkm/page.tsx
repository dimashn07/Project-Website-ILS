"use client"

import React, { useEffect, useState } from 'react';
import SingleBlog from "@/components/Berita/SingleBlog";
import { collection, onSnapshot, query, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { BlogType } from "@/types/blog";
import Breadcrumb from "@/components/Common/Breadcrumb";

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

    // Filter by submenu "Eliminasi TB"
    const filteredBySubmenu = blogPosts.filter(blog => blog.submenu === 'UMKM');

    // Handle category change
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1); // Reset to first page
    };

    // Handle tag change
    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(event.target.value);
        setCurrentPage(1); // Reset to first page
    };

    // Get filtered posts
    let filteredPosts = filteredBySubmenu;

    if (selectedCategory !== 'All') {
        filteredPosts = filteredPosts.filter(blog => blog.category === selectedCategory);
    }

    if (selectedTag !== 'All') {
        filteredPosts = filteredPosts.filter(blog => blog.tags.includes(selectedTag));
    }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(filteredBySubmenu.flatMap(blog => blog.category)))];

    // Get unique tags
    const tags = ['All', ...Array.from(new Set(filteredBySubmenu.flatMap(blog => blog.tags)))];

    return (
        <>
            <Breadcrumb
                pageName="Blog Grid"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
            />

            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    
                    <div className="mb-8 flex justify-center">
                        <div className="mr-4">
                            <label htmlFor="categoryDropdown" className="mr-2 text-body-color">Category:</label>
                            <select
                                id="categoryDropdown"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="px-4 py-2 rounded bg-body-color bg-opacity-[15%] text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="tagDropdown" className="mr-2 text-body-color">Tag:</label>
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
                                <SingleBlog blog={blog} />
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
                                        className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition ${currentPage !== 1 ? "hover:bg-primary hover:bg-opacity-100 hover:text-white" : "cursor-not-allowed"}`}
                                    >
                                        Prev
                                    </button>
                                </li>
                                {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
                                    <li key={i + 1} className="mx-1">
                                        <button
                                            onClick={() => paginate(i + 1)}
                                            className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition ${currentPage === i + 1 ? "bg-primary text-white" : "hover:bg-primary hover:bg-opacity-100 hover:text-white"}`}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className="mx-1">
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                                        className={`flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition ${currentPage !== Math.ceil(filteredPosts.length / postsPerPage) ? "hover:bg-primary hover:bg-opacity-100 hover:text-white" : "cursor-not-allowed"}`}
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

export default Blog;

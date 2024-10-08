'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/app/firebaseConfig';
import { useRouter } from 'next/navigation';

const SingleBerita = ({ berita }) => {
    const [blogContent, setBlogContent] = useState<BlogContent[]>([]);
    const router = useRouter();

    interface BlogContent {
        id: string;
        title: string;
        content: string;
        contentImage: string;
        category: string;
        city: string;
        tags: string[];
        coverImage: string;
        publishedDate: string;
    }

    useEffect(() => {
        const fetchData = async () => {
            const beritaCollection = collection(db, 'berita');
            const querySnapshot = await getDocs(query(beritaCollection));
            let fetchedContent: BlogContent[] = [];
            querySnapshot.forEach((doc) => {
                const beritaData = doc.data();
                fetchedContent.push({
                    id: doc.id, 
                    title: beritaData.title,
                    content: beritaData.content,
                    contentImage: beritaData.contentImage,
                    category: beritaData.category,
                    city: beritaData.city,
                    tags: beritaData.tags,
                    coverImage: beritaData.coverImage,
                    publishedDate: beritaData.publishedDate,
                });
            });
            setBlogContent(fetchedContent);
        };

        fetchData();
    }, []);

    const handleLihatClick = (selectedBerita) => {
        router.push(`/berita/lihat?id=${selectedBerita.id}`);
    };

    const stripHtmlTags = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };
      

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark h-full">
            <a onClick={() => handleLihatClick(berita)} className="relative block w-full">
                <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
                    {berita?.city} 
                </span>
                {berita?.coverImage && <img src={berita.coverImage} alt={berita.title} className="object-cover w-full h-48" />}
            </a>
            <div className="flex flex-col flex-grow p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
                <h3>
                    <a onClick={() => handleLihatClick(berita)} className="mb-2 block text-xl text-justify font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">
                        {berita?.title}
                    </a>
                </h3>
                <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-justify text-base font-medium text-body-color dark:border-white dark:border-opacity-10 line-clamp-2">
                    {stripHtmlTags(berita?.content)}
                </p>
                <div className="flex justify-between text-center">
                    <div className="inline-block">
                        <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">Tanggal</h4>
                        <p className="text-xs text-body-color">{berita?.publishedDate}</p>
                    </div>
                    <div className="ml-6 inline-block">
                        <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">Kategori</h4>
                        <p className="text-xs text-body-color">{berita?.category}</p>
                    </div>
                    <div className="ml-6 inline-block">
                        <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">Wilayah</h4>
                        <p className="text-xs text-body-color">{berita?.city}</p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    white-space: normal;
                    max-height: calc(2 * 1.5em); /* assuming 1.5em is the line-height */
                }
            `}</style>
        </div>
    );
};


export default SingleBerita;

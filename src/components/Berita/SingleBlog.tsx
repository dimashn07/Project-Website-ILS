import Link from "next/link";
import { BlogType } from "@/types/blog";
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// import ReactHtmlParser from 'react-html-parser';
import { db } from "@/app/firebaseConfig";

interface blogList {
  id: string;
  title: string;
  content: string;
  image?: string;
  tags: string[];
  createdAt?: string;
  category: string;
  coverImage?: string;
}

const SingleBlog = ({ blog }: { blog: BlogType }) => {
  const [blogData, setBlogData] = useState<blogList | null>(null);

  useEffect(() => {
    const getBlogData = async () => {
      try {
        const docRef = doc(db, 'blogPosts', blog.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data) {
            const { title, content, tags, createdAt, category, image, coverImage } = data;
            setBlogData({ title, content, tags, createdAt, category, id: blog.id, image, coverImage });
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    getBlogData();

    return () => {
      setBlogData(null); 
    };
  }, [blog.id]);

  if (!blogData) {
    return null; 
  }

  const { title, content, createdAt, category, tags, image, coverImage } = blogData;

  const stripImages = (htmlContent: string) => {
    return htmlContent.replace(/<img[^>]*>/g, '');
  };

  const truncatedContent = stripImages(content);

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark h-full">
        <Link href="/blog-details" className="relative block w-full">
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
            {category}
          </span>
          {coverImage && <img src={coverImage} alt={title} className="object-cover w-full h-48" />}
        </Link>
        <div className="flex flex-col flex-grow p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link href={`/blog-sidebar?id=${blog.id}`} className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">
              {title}
            </Link>
          </h3>
          <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10 line-clamp-2 flex-grow">
            {/* {ReactHtmlParser(truncatedContent)} */}
          </p>
          <div className="flex items-center">
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">Date</h4>
              <p className="text-xs text-body-color">{createdAt}</p>
            </div>
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
    </>
  );
};

export default SingleBlog;
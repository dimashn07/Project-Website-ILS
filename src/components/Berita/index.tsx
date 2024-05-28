"use client"

import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import firebase_app from "@/app/firebaseConfig";
const db = getFirestore(firebase_app);

import { Blog } from "@/types/blog";

interface blogList {
  id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  publishDate: string;
  category: string;
}

const Blog = () => {
  const [blogPosts, setBlog] = useState<{ [key: string]: Blog[] }>({});

  useEffect(() => {
    const q = query(collection(db, 'blogPosts'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let blogPostsObj: { [key: string]: Blog[] } = {};

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const blogData = doc.data() as blogList;
        const blogId = doc.id;
        if (blogPostsObj[blogId]) {
          blogPostsObj[blogId].push({ ...blogData, id: blogId });
        } else {
          blogPostsObj[blogId] = [{ ...blogData, id: blogId }];
        }
      });

      // Sort the keys in descending order
      const sortedKeys = Object.keys(blogPostsObj).sort((a, b) => parseInt(b) - parseInt(a));
      // Slice the sorted keys to get only the first 3
      const limitedKeys = sortedKeys.slice(0, 3);
      // Reverse the order to display the latest posts first
      limitedKeys.reverse();
      // Create a new object with the limited keys and their corresponding blog posts
      const limitedBlogPostsObj: { [key: string]: Blog[] } = {};
      limitedKeys.forEach(key => {
        limitedBlogPostsObj[key] = blogPostsObj[key];
      });

      setBlog(limitedBlogPostsObj);
    });

    return () => {
      unsubscribe();
    };

  }, []);

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
        {Object.keys(blogPosts).sort((a, b) => parseInt(b) - parseInt(a)).map((id) => (
            <div key={id}>
              {blogPosts[id].map((blog) => (
                <SingleBlog key={blog.id} blog={blog} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

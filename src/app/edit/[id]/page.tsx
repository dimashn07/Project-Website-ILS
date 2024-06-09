"use client"

import React, { useEffect, useState } from 'react';
import EditBlogPostForm from '@/components/Admin/Berita/EditBerita/EditBlogPostForm';
import { useParams } from 'next/navigation';

const EditBlogPostPage = () => {
  const params = useParams();
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params && typeof params.id === 'string') {
      setId(params.id);
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return id ? (
    <main className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-lg w-full px-4">
        <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Edit Blog Post</h1>
        <EditBlogPostForm id={id} />
      </div>
    </main>
  ) : (
    <p>Error: ID not found</p>
  );
};

export default EditBlogPostPage;

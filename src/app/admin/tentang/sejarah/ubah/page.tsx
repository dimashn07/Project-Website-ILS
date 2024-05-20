import React from 'react';
// import CreateBlogPostForm from "@/components/Admin/addblog";
import { FormSejarah } from '@/components/SebaranWilayah/FormSejarah';

const EditSejarahPage = () => {
  return (
    <main className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-lg w-full px-4"> {/* Menetapkan lebar maksimum dan penuh layar */}
        <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Informasi Sejarah</h1>
        <FormSejarah />
      </div>
    </main>
  );
};

export default EditSejarahPage;
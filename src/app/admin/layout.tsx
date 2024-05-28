"use client"; 

import AdminHeader from "@/components/Admin/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "../../styles/index.css";
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <SessionProvider>
          <AdminHeader />
          {children}
          <ScrollToTop />
        </SessionProvider>
      </body>
    </html>
  );
};

export default AdminLayout;

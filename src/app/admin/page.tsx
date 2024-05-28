'use client'
import SebaranWilayah from "@/components/SebaranWilayah";
import Berita from "@/components/Berita";
import SosialMedia from "@/components/SosialMedia";
import Kontribusi from "@/components/Kontribusi";
import Program from "@/components/Program";
import VideoProfil from "@/components/VideoProfil";
import AdminRootLayout from "./layout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Inisiatif Lampung Sehat - Respect and Care",
//   description: "This is Home for Inisiatif Lampung Sehat",
//   // other metadata
// };

export default function Home() {

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/') 
    },
  })

  return (
    <>
      <AdminRootLayout>
        <Program />
        <Kontribusi />
        <SebaranWilayah />
        <VideoProfil />
        <Berita />
        <SosialMedia />
      </AdminRootLayout>
    </>
  );
}

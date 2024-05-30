'use client'
import AdminLayout from "./layout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SejarahPage from "./sejarah/page";
import VisiMisiPage from "./visi-misi/page";
import KontribusiPage from "./kontribusi/page";
import StrukturOrganisasiPage from "./struktur-organisasi/page";

export default function Home() {

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });

  if (!session?.user) {
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <AdminLayout>
        <Breadcrumb
          pageName="Beranda"
          description="Lembaga Inisiatif Lampung Sehat"
        />
        
        <KontribusiPage />
        <SejarahPage />
        <VisiMisiPage />
        <StrukturOrganisasiPage />
      </AdminLayout>
    </>
  );
}
'use client';

import AdminLayout from "./layout";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import SejarahPage from "./sejarah/page";
import VisiMisiPage from "./visi-misi/page";
import KontribusiPage from "./kontribusi/page";
import StrukturOrganisasiPage from "./struktur-organisasi/page";
import ProgramPage from "./program/page";
import ModalPage from "./modal/page";

export default function Home() {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

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
        
        <ModalPage />
        <ProgramPage />
        <KontribusiPage />
        <SejarahPage />
        <VisiMisiPage />
        <StrukturOrganisasiPage />
      </AdminLayout>
    </>
  );
}
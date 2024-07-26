'use client';

import AdminLayout from "./layout";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import KontribusiPage from "./kontribusi/page";
import ProgramPage from "./program/page";
import ModalPage from "./modal/page";
import VideoProfilPage from "./video-profil/page";
import DonasiPage from "./donasi/page";

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
        
        <DonasiPage />
        <ModalPage />
        <ProgramPage />
        <KontribusiPage />
        <VideoProfilPage />
      </AdminLayout>
    </>
  );
}
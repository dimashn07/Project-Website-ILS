'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from '../layout';
import SejarahPage from '../sejarah/page';
import VisiMisiPage from '../visi-misi/page';
import StrukturOrganisasiPage from '../struktur-organisasi/page';

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
      <AdminLayout >
        <Breadcrumb
          pageName="Tentang Kami"
          description="Lembaga Inisiatif Lampung Sehat"
        />
        
        <SejarahPage />
        <VisiMisiPage />
        <StrukturOrganisasiPage />
      </AdminLayout>
    </>
  );
}
// pages/index.js
import Breadcrumb from "@/components/Common/Breadcrumb";
import PartnershipMenu from '@/components/Kerjasama/Partnership';

export default function Home() {
  return (
    <>
      <Breadcrumb
        pageName="Kerjasama"
        description="Kerjasama Lembaga Inisiatif Lampung Sehat"
      />
      <div>
        <main className="flex flex-col items-center justify-center py-10">
          <PartnershipMenu />
        </main>
      </div>
    </>
  );
}

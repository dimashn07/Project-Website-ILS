import React from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";

const VisiMisi = () => {
  return (
    <>
      <Breadcrumb
        pageName="Visi & Misi"
        description="Visi dan Misi Lembaga Inisiatif lampung Sehat"
      />
      <section className="pb-[30px] pt-[10px]">
        <div className="container">
          <div className="mx-4 max-w-1.5xl.5">
            <h1 className="text-3xl font-semimatte mb-6">VISI</h1>
            <p className="text-lg mb-8">
            Ikut Berperan Aktif Dalam Mewujudkan Masyarakat Yang Sehat dan Sejahtera.
            </p>
            <h1 className="text-3xl font-semimatte mb-6">MISI</h1>
            <ol className="text-lg list-decimal pl-6 mb-8 ">
              <li className="mb-4">
                Membangun karakter angota ILS yang mempunyai kepribadian yang luhur, pantang menyerah, revolusioner dan memiliki solidaritas yang tinggi serta mempunyai kepedulian terhadap sesama.
              </li>
              <li className="mb-4">
                Meningkatkan kesejahteraan masyarakat dan ikut serta dalam membangun Bangsa dan Negara menuju masyarakat yang adil dan makmur berdasarkan Pancasila dan Undang-Undang Dasar 1945.
              </li>
              <li className="mb-4">
                Mengawal kebijakan pemerintah yang berkaitan dengan kesehatan.
              </li>
              <li className="mb-4">
                Berkoordinasi dengan pemerintah dalam mewujudkan masyarakat yang sehat dan sejahtera.
              </li>
              <li className="mb-4">
                Membangun kesadaran masyarakat mengenai pentingnya hidup sehat serta berupaya untuk menjaga dan meningkatkan kesehatan baik dirinya, keluarga dan masyarakat sekitar.
              </li>
              <li className="mb-4">
                Membangun kepedulian masyarakat terhadap kesehatan lingkungan.
              </li>
              <li className="mb-4">
                Ikut berperan Aktif dalam penangulangan kebencanaan.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisiMisi;

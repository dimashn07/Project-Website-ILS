import React from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";

const VisiMisi = () => {
  return (
    <>
      <Breadcrumb
         pageName="Sejarah"
        description="Sejarah Lembaga Inisiatif lampung Sehat"
      />
      <section className="pb-[50px] pt-[10px]">
        <div className="container">
          <div className="mx-4 max-w-1.5x1.5">
            <p className="text-lg mb-8">
    Inisiatif Lampung Sehat (ILS) merupakan Non-Government Organization (NGO) nirlaba yang memiliki dasar kepentingan 
    sosial dan juga lingkungan, bergerak dalam bidang sosial, kesehatan, dan pendidikan masyarakat dengan mengupayakan 
    terwujudnya masyarakat sehat dan Sejahtera
</p>

<div className="text-lg mb-8">
    Disahkan pada tanggal 2 September 2020 oleh Menteri Hukum Dan Hak Asasi Manusia Republik Indonesia nomor: AHU-0007058.AH.01.07.TAHUN 
    2020 Inisiatif Lampung Sehat (ILS) sejak tahun 2021 secara konsisten telah berkontribusi dalam penanggulangan penyakit menular
    khususnya tuberkulosis (TB), pada perjalanannya telah banyak memberi manfaat terhadap masyarakat, dengan mengusung tagline “Respect 
    and Care” ILS mengajak seluruh elemen untuk lebih peduli terhadap masyarakat yang terdampak penyakit menular
</div>

          </div>
        </div>
      </section>
    </>
  );
};

export default VisiMisi;

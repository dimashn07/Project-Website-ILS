import React from 'react';
import Map from './Map';

const SebaranWilayah: React.FC = () => {
  const handleProvinceClick = (e: React.MouseEvent<SVGElement>): void => {
    const province = (e.target as Element).parentNode as SVGElement;
    const allProvinces = document.querySelectorAll<SVGElement>("#lampung-map g");
    
    if (e.target instanceof SVGPathElement) {
      allProvinces.forEach((provinceElement) => {
        provinceElement.classList.remove("active");
      });
      province.classList.add("active");
      
      const provinceName = province.querySelector("title")?.innerHTML;
    }
  };

  return (
    <main className="grid grid-cols-2 gap-8 bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28">
      <div className="relative" style={{ marginTop: "-13rem", marginBottom: "-15rem", marginLeft: "7rem" }}>
        <Map onClick={handleProvinceClick} />
      </div>
      <div className="p-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ marginTop: "-4rem"}}>Sebaran Wilayah</h2>
        <div className="relative">
          <div className="absolute h-full w-6 bg-[#203c63] dark:bg-white" style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'}} />
          <p className="text-sm md:text-base lg:text-lg leading-relaxed pl-8">
            Kota Bandar Lampung
          </p>
        </div>

        <div className="relative" style={{ marginTop: "1rem" }}>
          <div className="absolute h-full w-6 bg-[#e24a32] dark:bg-white" style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'}} />
          <p className="text-sm md:text-base lg:text-lg leading-relaxed pl-8">
            Kabupaten Lampung Timur
          </p>
        </div>

        <div className="relative" style={{ marginTop: "1rem" }}>
          <div className="absolute h-full w-6 bg-[#8cb1aa] dark:bg-white" style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'}} />
          <p className="text-sm md:text-base lg:text-lg leading-relaxed pl-8">
            Kabupaten Lampung Tengah
          </p>
        </div>

        <div className="relative" style={{ marginTop: "1rem" }}>
          <div className="absolute h-full w-6 bg-[#277393] dark:bg-white" style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'}} />
          <p className="text-sm md:text-base lg:text-lg leading-relaxed pl-8">
            Kabupaten Lampung Selatan
          </p>
        </div>

        <div className="relative" style={{ marginTop: "1rem" }}>
          <div className="absolute h-full w-6 bg-[#be9b7b] dark:bg-white" style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'}} />
          <p className="text-sm md:text-base lg:text-lg leading-relaxed pl-8">
            Kabupaten Lampung Utara
          </p>
        </div>

        <div className="relative" style={{ marginTop: "1rem" }}>
          <div className="absolute h-full w-6 bg-[#33919d] dark:bg-white" style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'}} />
          <p className="text-sm md:text-base lg:text-lg leading-relaxed pl-8">
            Kabupaten Pesawaran
          </p>
        </div>

        <div className="relative" style={{ marginTop: "1rem" }}>
          <div className="absolute h-full w-6 bg-[#33919d] dark:bg-white" style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'}} />
          <p className="text-sm md:text-base lg:text-lg leading-relaxed pl-8">
            Kabupaten Tulang Bawang Barat
          </p>
        </div>

        <div className="relative" style={{ marginTop: "1rem" }}>
          <div className="absolute h-full w-6 bg-[#f2703c] dark:bg-white" style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'}} />
          <p className="text-sm md:text-base lg:text-lg leading-relaxed pl-8">
            Kabupaten Pringsewu
          </p>
        </div>

        <div className="relative" style={{ marginTop: "1rem" }}>
          <div className="absolute h-full w-6 bg-[#f7ac72] dark:bg-white" style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'}} />
          <p className="text-sm md:text-base lg:text-lg leading-relaxed pl-8">
            Kabupaten Tanggamus
          </p>
        </div>

      </div>
    </main>
  );

};

export default SebaranWilayah;

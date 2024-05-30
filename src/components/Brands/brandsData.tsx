// components/PartnershipMenu.js
import Image from 'next/image';

const partnerships = [
  {
    name: 'Bakrie Center Foundation',
    imageUrl: '/images/kerjasama/bcf.png',
  },
  {
    name: 'Rumah Sakit, DPM & Klinik',
    imageUrl: '/images/kerjasama/rumah-sakit.png',
  },
  {
    name: 'Ombudsman',
    imageUrl: '/images/kerjasama/ombudsman.png',
  },
  {
    name: 'Ikatan Wartawan Online',
    imageUrl: '/images/kerjasama/iwo.png',
  },
];

const PartnershipMenu = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {partnerships.map((partner, index) => (
        <div key={index} className="flex flex-col items-center w-60">
          <div className="relative w-32 h-32">
            <Image src={partner.imageUrl} alt={partner.name} layout="fill" objectFit="contain" />
          </div>
          <h3 className="mt-2 text-lg font-semibold text-center">{partner.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default PartnershipMenu;

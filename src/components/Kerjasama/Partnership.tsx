import Image from 'next/image';

const partnerships = [
  {
    name: 'Bakrie Center Foundation',
    imageUrl: '/images/kerjasama/bcf.png',
    description: 'Kerjasama dalam project Campus Leaders Program, untuk percepatan eliminasi TBC berbasis komunitas di lampung.',
  },
  {
    name: 'Rumah Sakit, DPM & Klinik',
    imageUrl: '/images/kerjasama/rumah-sakit.png',
    description: 'Kerjasama Rumah Sakit pada 7 RS PMDT di Lampung, 186 (DPM dan Klinik swasta dan pemerintah) per bulan juli 2023.',
  },
  {
    name: 'Ombudsman',
    imageUrl: '/images/kerjasama/ombudsman.png',
    description: 'Kerjasama Ombudsman RI Perwakilan Lampung dalam mendukung layanan kesehatan bagi pasien TB.',
  },
  {
    name: 'Ikatan Wartawan Online',
    imageUrl: '/images/kerjasama/iwo.png',
    description: 'Kerjasama Ikatan Wartawan Online Provinsi Lampung, dalam mendukung campaign dan edukasi TB melalui media masa.',
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
          <p className="mt-1 text-sm text-center">{partner.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PartnershipMenu;

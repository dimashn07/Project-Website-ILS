import Wilayah from './wilayah';
import Breadcrumb from "@/components/Common/Breadcrumb";

export default function Home() {
  const dataWilayah = [
    {
      nama: "Kota Bandar Lampung",
      alamat: "Jalan Pulau Damar No. 37 Way Dadi, Sukarame, Bandar Lampung",
      petaMarkers: [
        {
          position: { lat: -5.3777803479146895, lng: 105.28905425428589 },
          title: "Inisiatif Lampung Sehat Kota Bandar Lampung",
          address: {
            line1: "Jl. M.H. Thamrin No.1",
            line2: "Kec. Menteng",
            line3: "Kota Jakarta Pusat",
            line4: "DKI Jakarta 10310, Indonesia",
            link: "https://maps.app.goo.gl/someLink1"
          }
        }
      ]
    },
    {
      nama: "Kabupaten Lampung Timur",
      alamat: "Jalan A.H Nasution No. 09 Desa Pekalongan, Kec. Pekalongan, Kab. Lampung Timur",
      petaMarkers: [
        {
          position: { lat: -5.084435162747552, lng: 105.3547627938588 }, 
          title: "Inisiatif Lampung Sehat Kabupaten Lampung Timur",
          address: {
            line1: "Jl. Tunjungan No.2",
            line2: "Kec. Genteng",
            line3: "Kota Surabaya",
            line4: "Jawa Timur 60275, Indonesia",
            link: "https://maps.app.goo.gl/someLink2"
          }
        }
      ]
    },
    {
      nama: "Kabupaten Lampung Tengah",
      alamat: "Jalan KH. Ahmad Dahlan Dusun 1 Kampung Baru Kalirejo Kec. Kalirejo",
      petaMarkers: [
        {
          position: { lat: -5.217780821633308, lng: 104.95981938531605 },
          title: "Inisiatif Lampung Sehat Kabupaten Lampung Tengah",
          address: {
            line1: "Jl. Braga No.3",
            line2: "Kec. Sumur Bandung",
            line3: "Kota Bandung",
            line4: "Jawa Barat 40111, Indonesia",
            link: "https://maps.app.goo.gl/someLink3"
          }
        }
      ]
    },
    {
      nama: "Kabupaten Lampung Selatan",
      alamat: "Jalan Lintas Sumatera Perum Serambi Blok G4 No. 7 Kel. Way Urang Kec. Kalianda",
      petaMarkers: [
        {
          position: { lat: -5.691896192122327, lng: 105.57767830813908 },
          title: "Inisiatif Lampung Sehat Kabupaten Lampung Selatan",
          address: {
            line1: "Jl. Braga No.3",
            line2: "Kec. Sumur Bandung",
            line3: "Kota Bandung",
            line4: "Jawa Barat 40111, Indonesia",
            link: "https://maps.app.goo.gl/someLink3"
          }
        }
      ]
    },
    {
      nama: "Kabupaten Lampung Utara",
      alamat: "Jalan Stn. Nimbang Raja 1 Kelurahan Kota Alam Kecamatan Kotabumi Selatan",
      petaMarkers: [
        {
          position: { lat: -4.824334100513522, lng: 104.87530315186419 },
          title: "Inisiatif Lampung Sehat Kabupaten Lampung Utara",
          address: {
            line1: "Jl. Braga No.3",
            line2: "Kec. Sumur Bandung",
            line3: "Kota Bandung",
            line4: "Jawa Barat 40111, Indonesia",
            link: "https://maps.app.goo.gl/someLink3"
          }
        }
      ]
    },
    {
      nama: "Kabupaten Pesawaran",
      alamat: "Pekon Gadingrejo Timur, Kec. Gadingrejo, Kab. Pringsewu",
      petaMarkers: [
        {
          position: { lat: -5.363254502159982, lng: 105.07985722766011 },
          title: "Inisiatif Lampung Sehat Kabupaten Pesawaran",
          address: {
            line1: "Jl. Braga No.3",
            line2: "Kec. Sumur Bandung",
            line3: "Kota Bandung",
            line4: "Jawa Barat 40111, Indonesia",
            link: "https://maps.app.goo.gl/someLink3"
          }
        }
      ]
    },
    {
      nama: "Kabupaten Tulang Bawang Barat",
      alamat: "Tiyuh Pulung Kencana RT/RW 003/002 Kec. Tulang Bawang Tengah",
      petaMarkers: [
        {
          position: { lat: -4.570801322281746, lng: 105.1050259271603 },
          title: "Inisiatif Lampung Sehat Kabupaten Tulang Bawang Barat",
          address: {
            line1: "Jl. Braga No.3",
            line2: "Kec. Sumur Bandung",
            line3: "Kota Bandung",
            line4: "Jawa Barat 40111, Indonesia",
            link: "https://maps.app.goo.gl/someLink3"
          }
        }
      ]
    },
    {
      nama: "Kabupaten Pringsewu",
      alamat: "Jalan KH. Gholib Gang Melati Kec. Pringsewu Barat Kab. Pringsewu",
      petaMarkers: [
        {
          position: { lat: -5.345278440149727, lng: 104.97391890813455 },
          title: "Inisiatif Lampung Sehat Kabupaten Pringsewu",
          address: {
            line1: "Jl. Braga No.3",
            line2: "Kec. Sumur Bandung",
            line3: "Kota Bandung",
            line4: "Jawa Barat 40111, Indonesia",
            link: "https://maps.app.goo.gl/someLink3"
          }
        }
      ]
    },
    {
      nama: "Kabupaten Tanggamus",
      alamat: "Dusun Wayhalom Pekon Sukamernah RT 03/RW 01 (Bidan Susan) Kec. Gunung Alip",
      petaMarkers: [
        {
          position: { lat: -5.394989431016115, lng: 104.7782664523116 },
          title: "Inisiatif Lampung Sehat Kabupaten Tanggamus",
          address: {
            line1: "Jl. Braga No.3",
            line2: "Kec. Sumur Bandung",
            line3: "Kota Bandung",
            line4: "Jawa Barat 40111, Indonesia",
            link: "https://maps.app.goo.gl/someLink3"
          }
        }
      ]
    }
  ];

  return (
    <>
      <Breadcrumb
        pageName="Sebaran Wilayah"
        description="Sebaran Wilayah Lembaga Inisiatif Lampung Sehat"
      />

      <div>
        <main className="container mx-auto px-4">
          {dataWilayah.map((wilayah, index) => (
            <Wilayah
              key={index}
              nama={wilayah.nama}
              alamat={wilayah.alamat}
              petaMarkers={wilayah.petaMarkers}
            />
          ))}
        </main>
      </div>
    </>
  );
}

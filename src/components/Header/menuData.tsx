import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Beranda",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Tentang Kami",
    //path: "/about"
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "Sejarah",
        path: "/tentang-kami/sejarah",
        newTab: false,
      },
      {
        id: 22,
        title: "Visi & Misi",
        path: "/tentang-kami/visimisi",
        newTab: false,
      },
      {
        id: 23,
        title: "Struktur Organisasi",
        path: "/tentang-kami/strukturorganisasi",
        newTab: false,
      },
    ],
  },
  {
    id: 3,
    title: "Pelaksana",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Sebaran Wilayah",
        path: "/pelaksana/sebaran-wilayah",
        newTab: false,
      },
      {
        id: 32,
        title: "Kerja Sama",
        path: "/pelaksana/kerjasama",
        newTab: false,
      },
    ],
  },
  {
    id: 4,
    title: "Berita",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Eliminasi TB",
        path: "/berita/eliminasi-tb",
        newTab: false,
      },
      {
        id: 42,
        title: "UMKM",
        path: "/berita/umkm",
        newTab: false,
      },
      {
        id: 43,
        title: "Layanan Kesehatan Publik",
        path: "/berita/layanan-kesehatan-publik",
        newTab: false,
      },
    ],
  },
  
];
export default menuData;
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
        path: "/about/sejarah",
        newTab: false,
      },
      {
        id: 22,
        title: "Visi & Misi",
        path: "/about/visimisi",
        newTab: false,
      },
      {
        id: 23,
        title: "Struktur Organisasi",
        path: "/about/strukturorganisasi",
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
        path: "",
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
        path: "/blog",
        newTab: false,
      },
      {
        id: 42,
        title: "UMKM",
        path: "/blog",
        newTab: false,
      },
      {
        id: 43,
        title: "Layanan Kesehatan Publik",
        path: "/blog",
        newTab: false,
      },
    ],
  },
  
];
export default menuData;
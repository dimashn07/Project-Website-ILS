import { Menu } from "@/types/menu";

const MenuData: Menu[] = [
  {
    id: 1,
    title: "Beranda",
    path: "/admin",
    newTab: false,
  },
  {
    id: 2,
    title: "Tentang Kami",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "Sejarah",
        path: "/admin/tentang/sejarah",
        newTab: false,
      },
      {
        id: 22,
        title: "Visi & Misi",
        path: "/admin/tentang/visi-misi",
        newTab: false,
      },
      {
        id: 23,
        title: "Struktur Organisasi",
        path: "/admin/tentang/struktur-organisasi",
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
        path: "/admin/pelaksana/sebaran-wilayah",
        newTab: false,
      },
      {
        id: 32,
        title: "Kerja Sama",
        path: "/admin/pelaksana/kerja-sama",
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
        path: "/admin/berita/eliminasi-tb",
        newTab: false,
      },
      {
        id: 42,
        title: "UMKM",
        path: "/admin/berita/umkm",
        newTab: false,
      },
      {
        id: 43,
        title: "Layanan Kesehatan Publik",
        path: "/admin/berita/layanan-kesehatan-publik",
        newTab: false,
      },
    ],
  },
  
];
export default MenuData;
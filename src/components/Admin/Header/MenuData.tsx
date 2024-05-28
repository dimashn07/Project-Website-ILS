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
    title: "Berita",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "Eliminasi TB",
        path: "/admin/berita/eliminasi-tb",
        newTab: false,
      },
      {
        id: 52,
        title: "UMKM",
        path: "/admin/berita/umkm",
        newTab: false,
      },
      {
        id: 53,
        title: "Layanan Kesehatan Publik",
        path: "/admin/berita/layanan-kesehatan-publik",
        newTab: false,
      },
    ],
  },
  
];
export default MenuData;
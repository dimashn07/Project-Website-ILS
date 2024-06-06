'use client'

import SebaranWilayah from "@/components/SebaranWilayah";
import Berita from "@/components/Berita";
import Brands from "@/components/Kerjasama";
// import ScrollUp from "@/components/Common/ScrollUp";
import SosialMedia from "@/components/SosialMedia";
import Kontribusi from "@/components/Kontribusi";
import Program from "@/components/Program";
import VideoProfil from "@/components/VideoProfil";

export default function Home() {

  return (
    <>
      <Program />
      <Kontribusi />
      <SebaranWilayah />
      <VideoProfil />
      <Brands/>
      <Berita />
      <SosialMedia />
    </>
  );
}

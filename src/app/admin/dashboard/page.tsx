import About from "@/components/SebaranWilayah";
import Blog from "@/components/Berita";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/SosialMedia";
import Features from "@/components/Kontribusi";
import Hero from "@/components/Program";
import Video from "@/components/VideoProfil";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inisiatif Lampung Sehat - Respect and Care",
  description: "This is Home for Inisiatif Lampung Sehat",
  // other metadata
};

export default function Home() {

  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <About />
      <Video />
      <Brands />
      <Blog />
      <Contact />
    </>
  );
}

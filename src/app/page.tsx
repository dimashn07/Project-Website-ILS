import About from "@/components/About";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/SosialMedia";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
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
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}

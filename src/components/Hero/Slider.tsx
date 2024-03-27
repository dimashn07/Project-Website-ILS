"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { images } from "@/types/constants";
import Description from "./Description";

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const clickNext = () => {
    setActiveImage(activeImage === images.length - 1 ? 0 : activeImage + 1);
  };

  const clickPrev = () => {
    setActiveImage(activeImage === 0 ? images.length - 1 : activeImage - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);

  const handleImageClick = (index) => {
    console.log("View details of image:", index);
    // Handle click event, e.g., navigate to details page
  };

  return (
    <main className="grid place-items-center md:grid-cols-2 grid-cols-1 w-full mx-auto max-w-5xl shadow-2xl rounded-3xl overflow-hidden relative">
      <div className="w-full h-full relative overflow-hidden">
        {images.map((elem, idx) => (
          <div
            key={idx}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
              idx === activeImage ? "" : "hidden"
            } ${isZoomed ? "z-10" : ""}`}
            style={{ transform: isZoomed ? "scale(1.2)" : "scale(1)" }}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onClick={() => handleImageClick(idx)}
          >
            <Image
              src={elem.src}
              alt=""
              width={400}
              height={400}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        ))}
      </div>
      <Description
        activeImage={activeImage}
        clickNext={clickNext}
        clickPrev={clickPrev}
      />
    </main>
  );
};

export default Slider;
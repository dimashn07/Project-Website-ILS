/*import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    title: "17,013",
    paragraph:
      "Investigasi Kontak",
  },
  {
    id: 1,
    title: "136,522",
    paragraph:
      "Terduga TB",
  },
  {
    id: 1,
    title: "11,566",
    paragraph:
      "Positif TB",
  },
  {
    id: 1,
    title: "9,047",
    paragraph:
      "Pasien Sembuh",
  },
  {
    id: 1,
    title: "385",
    paragraph:
      "TB RO di Dampingi",
  },
  {
    id: 1,
    title: "186",
    paragraph:
      "Intervensi DPPM",
  },
];
export default featuresData;*/


"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const img1 = require ("/public/images/features/IK.svg");
const img2 = require ("/public/images/features/Terduga-TB.svg");
const img3 = require ("/public/images/features/Positif-TB.svg");
const img4 = require ("/public/images/features/Pasien-Sembuh.svg");
const img5 = require ("/public/images/features/DPPM.svg");
const img6 = require ("/public/images/features/TB-Dampingi.svg");

const App = () => {
  const [active, setActive] = useState<number>(0);
  const [prev, setPrev] = useState<number>(0);

  // Refs
  const contentRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  interface SlideContent {
    img: any;
    name: string;
  }

  const sliderContent: SlideContent[] = [
    {
      img: img1,
      name: "Investigasi Kontak => 17,013",
    },
    {
      img: img2,
      name: "Terduga TB => 136,522",
    },
    {
      img: img3,
      name: "Positif TB => 11,566",
    },
    {
      img: img4,
      name: "Pasien Sembuh => 9,047",
    },
    {
      img: img5,
      name: "TB RO di Dampingi => 385",
    },
    {
      img: img6,
      name: "Intervensi DPPM => 186",
    },
  ];

  const Slide = (type: string) => {
    let local: number;
    if (type === "next") {
      local = active + 1;
      sliderContent.length - 1 < local ? setActive(0) : setActive(local);
    }
    if (type === "prev") {
      local = active - 1;
      local < 0 ? setActive(sliderContent.length - 1) : setActive(local);
    }
    setPrev(active);
  };

  useEffect(() => {
    if (contentRef.current && prevRef.current && nextRef.current && nameRef.current) {
      contentRef.current.style.bottom = "-100%";
      prevRef.current.style.left = "-10%";
      nextRef.current.style.right = "-10%";
      setTimeout(() => {
        if (nameRef.current) {
          nameRef.current.innerText = sliderContent[active].name;
        }
        if (contentRef.current && prevRef.current && nextRef.current) {
          contentRef.current.style.bottom = "0%";
          prevRef.current.style.left = "0%";
          nextRef.current.style.right = "0%";
        }
      }, 1000);
    }
  }, [active]);

  return (
    <div>
      <div className="rounded-xl relative shadow-lg overflow-hidden">
        <div className="w-[600px] h-[400px] relative">
          {sliderContent.map((slide, i) => (
            <Image
              src={slide.img}
              key={i}
              alt="slideImg"
              className={`h-full w-full absolute object-cover inset-0 duration-[2.5s] ease-out transition-[clip-path] ${
                i === active ? "clip-visible" : "clip-hidden"
              }`}
            />
          ))}
          <Image
            src={sliderContent[prev].img}
            alt="previmg"
            className="w-full h-full  object-cover"
          />
        </div>
        <div>
          <button id="back" ref={prevRef} onClick={() => Slide("prev")}>
            <ChevronLeftIcon className="h-10 w-10 text-black" />
          </button>
          <button
            id="forward"
            ref={nextRef}
            className="right-0"
            onClick={() => Slide("next")}
          >
            <ChevronRightIcon className="h-10 w-10 text-black" />
          </button>
        </div>
        <div className="content" ref={contentRef}>
          <h1 ref={nameRef} className="text-black">{sliderContent[0].name}</h1>
          <p className="text-black">
            *Berdasarkan laporan capaian Januari 2021 s.d Desember 2023.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;

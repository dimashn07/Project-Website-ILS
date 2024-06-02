'use client'
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '@/app/firebaseConfig';

const App = () => {
  const [active, setActive] = useState<number>(0);
  const [sliderContent, setSliderContent] = useState<SlideContent[]>([]);

  // Refs
  const contentRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const formatNumber = (num) => {
    if (num === undefined || num === null) {
      return '0';
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  interface SlideContent {
    img: string;
    name: string;
    description?: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      const kontribusiCollection = collection(db, 'kontribusi');
      const querySnapshot = await getDocs(query(kontribusiCollection));
      let fetchedContent: SlideContent[] = [];
      querySnapshot.forEach((doc) => {
        const kontribusiData = doc.data();
        fetchedContent.push({
          img: kontribusiData.gambar,
          name: `${kontribusiData.jenis} => ${formatNumber(kontribusiData.jumlah)}`,
          description: kontribusiData.keterangan,
        });
      });
      setSliderContent(fetchedContent);
    };

    fetchData();
  }, []);

  const Slide = (type: string) => {
    if (type === "next") {
      setActive((prevActive) => (prevActive + 1) % sliderContent.length);
    }
    if (type === "prev") {
      setActive((prevActive) => (prevActive - 1 + sliderContent.length) % sliderContent.length);
    }
  };

  useEffect(() => {
    if (contentRef.current && prevRef.current && nextRef.current && nameRef.current) {
      contentRef.current.style.bottom = "-100%";
      prevRef.current.style.left = "-10%";
      nextRef.current.style.right = "-10%";
      setTimeout(() => {
        if (nameRef.current) {
          nameRef.current.innerText = sliderContent[active]?.name || "";
        }
        if (contentRef.current && prevRef.current && nextRef.current) {
          contentRef.current.style.bottom = "0%";
          prevRef.current.style.left = "0%";
          nextRef.current.style.right = "0%";
        }
      }, 1000);
    }
  }, [active, sliderContent]);

  return (
    <div>
      <div className="rounded-xl relative shadow-lg overflow-hidden">
        <div className="w-[600px] h-[400px] relative">
          {sliderContent.map((item, i) => (
            <img
                src={item.img}
                key={i}
                alt="slideImg"
                className={`h-full w-full absolute object-cover inset-0 duration-[2.5s] ease-out transition-[clip-path] ${
                  i === active ? "clip-visible" : "clip-hidden"
                }`}
                style={{ transition: 'clip-path 2.5s ease-out' }}
              />
          ))}
          <img
            src={sliderContent[active]?.img || ""}
            alt="previmg"
            className="w-full h-full object-cover"
            style={{ transition: 'clip-path 2.5s ease-out' }}
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
          <h1 ref={nameRef} className="text-black">{sliderContent[active]?.name}</h1>
          <p className="text-black">
            {sliderContent[active]?.description || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;

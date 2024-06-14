"use client";
import { useEffect, useState } from "react";
import Description from "./Description";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [sliderContent, setSliderContent] = useState<SlideContent[]>([]);

  const router = useRouter();

  interface SlideContent {
    src: string;
    title: string;
    desc: string;
    link: string
  }

  useEffect(() => {
    const fetchData = async () => {
      const programCollection = collection(db, 'program');
      const querySnapshot = await getDocs(query(programCollection));
      let fetchedContent: SlideContent[] = [];
      querySnapshot.forEach((doc) => {
        const programData = doc.data();
        fetchedContent.push({
          src: programData.gambar,
          title: programData.judul,
          desc: programData.deskripsi,
          link: programData.berita,
        });
      });
      setSliderContent(fetchedContent);
    };

    fetchData();
  }, []);

  const clickNext = () => {
    setActiveImage(activeImage === sliderContent.length - 1 ? 0 : activeImage + 1);
  };

  const clickPrev = () => {
    setActiveImage(activeImage === 0 ? sliderContent.length - 1 : activeImage - 1);
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
    const link = sliderContent[index].link;
    router.push(link);
  };

  return (
    <main className="grid place-items-center md:grid-cols-2 grid-cols-1 w-full mx-auto max-w-5xl shadow-2xl rounded-3xl overflow-hidden relative">
      <div className="w-full h-full relative overflow-hidden">
        
        {sliderContent.map((elem, idx) => (
          <a href={elem.link}>
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
              <img
                src={elem.src}
                alt={elem.title}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
          </a>
        ))}
      </div>
      <Description
        activeImage={activeImage}
        clickNext={clickNext}
        clickPrev={clickPrev}
        images={sliderContent}
      />
    </main>
  );
};

export default Slider;

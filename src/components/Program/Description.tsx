import React from "react";
import { motion } from "framer-motion";

type Props = {
  activeImage: number;
  clickNext: () => void;
  clickPrev: () => void;
  images: { src: string; title: string; desc: string }[];
};

const Description = ({ activeImage, clickNext, clickPrev, images }: Props) => {
  const leftSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 512 512"
    >
      <path
        fill="#fff"
        d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48m35.31 292.69a16 16 0 1 1-22.62 22.62l-96-96a16 16 0 0 1 0-22.62l96-96a16 16 0 0 1 22.62 22.62L206.63 256Z"
      />
    </svg>
  );

  const rightSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 512 512"
    >
      <path
        fill="#fff"
        d="M48 256c0 114.87 93.13 208 208 208s208-93.13 208-208S370.87 48 256 48S48 141.13 48 256m257.37 0l-84.68-84.69a16 16 0 0 1 22.62-22.62l96 96a16 16 0 0 1 0 22.62l-96 96a16 16 0 0 1-22.62-22.62Z"
      />
    </svg>
  );

  return (
    <div className="grid place-items-start w-full bg-[#a3da22] relative md:rounded-tr-3xl md:rounded-br-3xl">
      {/* <div className="uppercase text-sm absolute right-4 top-2 underline-offset-4 underline">
        Program Inisiatif Lampung Sehat
      </div> */}
      {images.map((elem, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImage
              ? "block w-full h-full md:h-[80vh] py-20 md:px-20 px-10 text-left"
              : "hidden"
          }`}
        >
          <motion.div
            initial={{
              opacity: idx === activeImage ? 0 : 0.5,
              scale: idx === activeImage ? 0.5 : 0.3,
            }}
            animate={{
              opacity: idx === activeImage ? 1 : 0.5,
              scale: idx === activeImage ? 1 : 0.3,
            }}
            transition={{
              ease: "linear",
              duration: 2,
              x: { duration: 1 },
            }}
            className="w-full"
          >
            <div className="pt-16 pb-16 text-3xl font-extrabold">
              Inisiatif Lampung Sehat 
              <div className="mt-6 text-5xl text-center">
              {elem.title}
              </div>
            </div>
            <div className="leading-relaxed font-medium text-base tracking-wide h-60 md:h-40 italic text-gray-600">
              {elem.desc}
            </div>
          </motion.div>

          <div className="absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center">
            <div
              className="absolute bottom-2 right-10 cursor-pointer"
              onClick={clickPrev}
            >
              {leftSvg}
            </div>

            <div
              className="absolute bottom-2 right-2 cursor-pointer"
              onClick={clickNext}
            >
              {rightSvg}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Description;

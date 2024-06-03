"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

const VideoProfil = () => {
  const [isOpen, setOpen] = useState(false);
  const [videoProfil, setVideoProfil] = useState<VideoProfile | null>(null);

  interface VideoProfile {
    deskripsi: string;
    link: string;
    gambar: string;
    id: string;
  }

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\/videos\/|\/embed\/|\/v\/|watch\?v=|watch\?v%3D|watch\?feature=player_embedded&v=|%2Fvideos%2F|embed%2F|v%3D)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    const q = query(collection(db, "videoProfil"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setVideoProfil({ ...doc.data(), id: doc.id } as VideoProfile);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const videoId = videoProfil ? getYouTubeVideoId(videoProfil.link) : null;

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        {videoProfil && (
          <div className="kontribusi">
            <div className="text-center">
              <div className="text-3xl font-bold mb-4">
                Video Profil Inisiatif Lampung Sehat
              </div>
              <div className="text-lg mb-6">{videoProfil.deskripsi}</div>
            </div>
          </div>
        )}
        {videoProfil && (
          <div className="mb-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="mx-auto max-w-[770px] overflow-hidden rounded-md"
                data-wow-delay=".15s"
              >
                <div className="relative aspect-[77/40] items-center justify-center">
                  <Image
                    src={videoProfil.gambar}
                    alt="video thumbnail"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                    <button
                      aria-label="video play button"
                      onClick={() => setOpen(true)}
                      className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                    >
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        className="fill-current"
                      >
                        <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {videoId && (
        <ModalVideo
          channel="youtube"
          autoplay={true}
          start={true}
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default VideoProfil;

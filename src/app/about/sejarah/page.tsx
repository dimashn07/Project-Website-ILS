'use client'
// import React from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

const SejarahPage = () => {
    const [sejarah, setSejarah] = useState<{ [key: string]: any }[]>([]);

    useEffect(() => {
      const q = query(collection(db, 'sejarah'), orderBy('paragraf', 'asc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let sejarahArr: { id: string }[] = []; // Define the type annotation correctly
    
        querySnapshot.forEach((doc) => {
          sejarahArr.push({...doc.data(), id: doc.id})
        });
    
        setSejarah(sejarahArr);
      })
    
      return () => {
        unsubscribe();
      };
    }, []);
    

    return (
      <>
        <Breadcrumb
          pageName="Sejarah"
          description="Sejarah Lembaga Inisiatif Lampung Sehat"
        />
        <section className="pb-[50px] pt-[10px]">
          <div className="container">
            <div className="mx-4 max-w-1.5x1.5">
              {sejarah.map((item) => (
                <div key={item.id} className="text-lg mb-8">
                  {item.deskripsi}
                </div>
              ))}
            </div>
          </div>
        </section> 
      </>
    );
};

export default SejarahPage;
'use client'
import React from 'react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

const VisiMisiPage = () => {

  const [visi, setVisi] = useState<{ [key: string]: any }[]>([]);
  const [misi, setMisi] = useState<{ [key: string]: any }[]>([]);

    useEffect(() => {
      const q = query(collection(db, 'visi'))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let visiArr : { id: string }[] = [];
    
        querySnapshot.forEach((doc) => {
          visiArr.push({...doc.data(), id: doc.id})
        });
        setVisi(visiArr);
      })

      const qu = query(collection(db, 'misi'))
      const unsub = onSnapshot(qu, (querySnapshot) => {
        let misiArr : { id: string }[] = [];
    
        querySnapshot.forEach((doc) => {
          misiArr.push({...doc.data(), id: doc.id})
        });
        setMisi(misiArr);
      })
    
      return () => {
        unsubscribe();
        unsub();
      };
    }, []);

  return (
    <>
      <Breadcrumb
        pageName="Visi & Misi"
        description="Visi dan Misi Lembaga Inisiatif lampung Sehat"
      />
      <section className="pb-[30px] pt-[10px]">
        <div className="container">
          <div className="mx-4 max-w-1.5xl.5">
            <h1 className="text-3xl font-semimatte mb-6">VISI</h1>
            <p className="text-lg mb-8">
              {visi.map((item) => (
                  <div key={item.id} className="text-lg mb-8">
                    {item.deskripsi}
                  </div>
                ))}
            </p>
            <h1 className="text-3xl font-semimatte mb-6">MISI</h1>
            <div className='text-justify'>
              {misi.map((item, index) => (
                  <div key={item.id} className="text-lg mb-4">
                    {index+1}. {item.deskripsi}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisiMisiPage;

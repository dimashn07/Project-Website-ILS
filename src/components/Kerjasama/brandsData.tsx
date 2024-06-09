'use client'
import { db } from '@/app/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const PartnershipMenu = () => {
  const [kerjasama, setKerjasama] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'kerjasama'), orderBy('instansi', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let kerjasamaArr: { id: string }[] = []; 

      querySnapshot.forEach((doc) => {
        kerjasamaArr.push({...doc.data(), id: doc.id});
      });

      setKerjasama(kerjasamaArr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {kerjasama.map((item, index) => (
        <div key={index} className="flex flex-col items-center w-60">
          <div className="relative w-32 h-32">
            <img src={item.logo} alt={item.name} className="object-contain w-full h-full"/>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-center">
            {item.instansi}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default PartnershipMenu;

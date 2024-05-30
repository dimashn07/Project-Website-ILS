"use client"

import React, { useEffect, useState } from 'react';
import OrganizationalStructure from '@/components/Common/dataStrukturOrganisasi';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { db } from '@/app/firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';

const StrukturOrganisasi = () => {
  const [pengurusILS, setPengurusILS] = useState<PengurusILS[]>([]);

  interface PengurusILS {
    kategori: string
    nama: string;
    jabatan: string;
    foto: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      const pengurusCollection = collection(db, 'pengurusILS');
      const querySnapshot = await getDocs(query(pengurusCollection));
      let fetchedPengurusILS: PengurusILS[] = [];
      querySnapshot.forEach((doc) => {
        const pengurusData = doc.data();
        fetchedPengurusILS.push({
          kategori: pengurusData.kategori,
          nama: pengurusData.nama,
          jabatan: pengurusData.jabatan,
          foto: pengurusData.foto
        });
      });
      setPengurusILS(fetchedPengurusILS);
    };

    fetchData();
  }, []);

  // const pengurusILS = [
  //   {
  //     name: 'DWI SETYORINI, S.Pd',
  //     positionBold: 'DEWAN PENGAWAS',
  //     position: 'DEWAN PENGAWAS ILS',
  //     imageUrl: '/images/strukturOrganisasi/wanita.png',
  //   },
  //   {
  //     name: 'SUDIYANTO, S.Sos',
  //     positionBold: 'SR MANAGER',
  //     position: 'SR MANAGER ILS',
  //     imageUrl: '/images/strukturOrganisasi/pria.png',
  //   },
  //   {
  //     name: 'TEO RENDRA ARIFIN, S.E',
  //     positionBold: 'KOORDINATOR',
  //     position: 'Finance & Operations Coordinator',
  //     imageUrl: '/images/strukturOrganisasi/pria.png',
  //   },
  //   {
  //     name: 'DIAN SUGIANTO, S.Kom',
  //     positionBold: 'KOORDINATOR',
  //     position: 'PMEL Coordinator',
  //     imageUrl: '/images/strukturOrganisasi/pria.png',
  //   },
  //   {
  //     name: 'NOVITA SARI, S.Kom',
  //     positionBold: 'STAFF',
  //     position: 'Finance & Operation Staff',
  //     imageUrl: '/images/strukturOrganisasi/wanita.png',
  //   },
  //   {
  //     name: 'RUDY FIRMANSYAH PUTRA, A.Md',
  //     positionBold: 'STAFF',
  //     position: 'Finance & Operation Staff',
  //     imageUrl: '/images/strukturOrganisasi/pria.png',
  //   },
  //   {
  //     name: 'REZA ZIKRI FAUZIAN, S.H',
  //     positionBold: 'STAFF',
  //     position: 'Program Staff',
  //     imageUrl: '/images/strukturOrganisasi/pria.png',
  //   },
  //   {
  //     name: 'PODO WISESO, S.Kom',
  //     positionBold: 'STAFF',
  //     position: 'MEL Staff',
  //     imageUrl: '/images/strukturOrganisasi/pria.png',
  //   },
  //   {
  //     name: 'AZHARUL FAZRI SIAGIAN, S.Pd',
  //     positionBold: 'STAFF',
  //     position: 'MEL Staff',
  //     imageUrl: '/images/strukturOrganisasi/pria.png',
  //   },
  // ];

  const pokJa = [
    {
      name:"",
      positionBold: '',
      position: '',
      imageUrl: '',
    },
  ];

   return (
    <>
      <Breadcrumb
        pageName="Struktur Organisasi"
        description="Struktur Organisasi Lembaga Inisiatif Lampung Sehat"
      />
      <section className="pb-[50px] pt-[10px]">
        <div className="container mx-auto px-4">
          <main className="flex flex-col items-center justify-center">
            <div className="mt-0">
              <div className="mt-8">
                <OrganizationalStructure members={pengurusILS} />
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default StrukturOrganisasi;

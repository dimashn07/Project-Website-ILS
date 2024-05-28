"use client"

import React, { useState } from 'react';
import OrganizationalStructure from '@/components/Common/dataStrukturOrganisasi';
import Breadcrumb from "@/components/Common/Breadcrumb";

const StrukturOrganisasi = () => {
  const [activeTab, setActiveTab] = useState('ils');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const pengurusILS = [
    {
      name: 'DWI SETYORINI, S.Pd',
      positionBold: 'DEWAN PENGAWAS',
      position: 'DEWAN PENGAWAS ILS',
      imageUrl: '/images/strukturOrganisasi/wanita.png',
    },
    {
      name: 'SUDIYANTO, S.Sos',
      positionBold: 'SR MANAGER',
      position: 'SR MANAGER ILS',
      imageUrl: '/images/strukturOrganisasi/pria.png',
    },
    {
      name: 'TEO RENDRA ARIFIN, S.E',
      positionBold: 'KOORDINATOR',
      position: 'Finance & Operations Coordinator',
      imageUrl: '/images/strukturOrganisasi/pria.png',
    },
    {
      name: 'DIAN SUGIANTO, S.Kom',
      positionBold: 'KOORDINATOR',
      position: 'PMEL Coordinator',
      imageUrl: '/images/strukturOrganisasi/pria.png',
    },
    {
      name: 'NOVITA SARI, S.Kom',
      positionBold: 'STAFF',
      position: 'Finance & Operation Staff',
      imageUrl: '/images/strukturOrganisasi/wanita.png',
    },
    {
      name: 'RUDY FIRMANSYAH PUTRA, A.Md',
      positionBold: 'STAFF',
      position: 'Finance & Operation Staff',
      imageUrl: '/images/strukturOrganisasi/pria.png',
    },
    {
      name: 'REZA ZIKRI FAUZIAN, S.H',
      positionBold: 'STAFF',
      position: 'Program Staff',
      imageUrl: '/images/strukturOrganisasi/pria.png',
    },
    {
      name: 'PODO WISESO, S.Kom',
      positionBold: 'STAFF',
      position: 'MEL Staff',
      imageUrl: '/images/strukturOrganisasi/pria.png',
    },
    {
      name: 'AZHARUL FAZRI SIAGIAN, S.Pd',
      positionBold: 'STAFF',
      position: 'MEL Staff',
      imageUrl: '/images/strukturOrganisasi/pria.png',
    },
  ];

  const pokJa = [
    {
      name: 'DWI SETYORINI, S.Pd',
      positionBold: 'DEWAN PENGAWAS',
      position: 'DEWAN PENGAWAS ILS',
      imageUrl: '/images/strukturOrganisasi/wanita.png',
    },
    {
      name: 'SUDIYANTO, S.Sos',
      positionBold: 'SR MANAGER',
      position: 'SR MANAGER ILS',
      imageUrl: '/images/strukturOrganisasi/pria.png',
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
              <div className="flex justify-center space-x-4">
                <button
                  className={`text-lg font-bold px-4 py-2 focus:outline-none ${activeTab === 'ils' ? 'text-[#A3DA22] border-b-2 border-[#A3DA22]' : 'text-[#056526]'}`}
                  onClick={() => handleTabClick('ils')}
                >
                  Pengurus ILS
                </button>
                <button
                  className={`text-lg font-bold px-4 py-2 focus:outline-none ${activeTab === 'pokja' ? 'text-[#A3DA22] border-b-2 border-[#A3DA22]' : 'text-[#056526]'}`}
                  onClick={() => handleTabClick('pokja')}
                >
                  Kelompok Kerja
                </button>
              </div>
              <div className="mt-8">
                {activeTab === 'ils' ? (
                  <OrganizationalStructure members={pengurusILS} />
                ) : (
                  <OrganizationalStructure members={pokJa} />
                )}
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default StrukturOrganisasi;

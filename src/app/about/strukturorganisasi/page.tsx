"use client"

import React from 'react';
import OrganizationalStructure from '@/components/Common/dataStrukturOrganisasi';
import Breadcrumb from "@/components/Common/Breadcrumb";

const StrukturOrganisasi = () => {
  const pengurusILS = [
    {
      name: 'DWI SETYORINI, S.Pd',
      positionBold: 'DEWAN PENGAWAS',
      position: 'DEWAN PENGAWAS ILS',
      imageUrl: '/images/strukturOrganisasi/rini.svg',
    },
    {
      name: 'SUDIYANTO, S.Sos',
      positionBold: 'SR MANAGER',
      position: 'SR MANAGER ILS',
      imageUrl: '/images/strukturOrganisasi/sudiyanto2.svg',
    },
    {
      name: 'TEO RENDRA ARIFIN, S.E',
      positionBold: 'KOORDINATOR',
      position: 'Finance & Operations Coordinator',
      imageUrl: '/images/strukturOrganisasi/teo.svg',
    },
    {
      name: 'DIAN SUGIANTO, S.Kom',
      positionBold: 'KOORDINATOR',
      position: 'PMEL Coordinator',
      imageUrl: '/images/strukturOrganisasi/dian-sugianto.svg',
    },
    {
      name: 'NOVITA SARI, S.Kom',
      positionBold: 'STAFF',
      position: 'Finance & Operation Staff',
      imageUrl: '/images/strukturOrganisasi/novitasari.svg',
    },
    {
      name: 'RUDY FIRMANSYAH PUTRA, A.Md',
      positionBold: 'STAFF',
      position: 'Finance & Operation Staff',
      imageUrl: '/images/strukturOrganisasi/rudy.svg',
    },
    {
      name: 'REZA ZIKRI FAUZIAN, S.H',
      positionBold: 'STAFF',
      position: 'Program Staff',
      imageUrl: '/images/strukturOrganisasi/reza.svg',
    },
    {
      name: 'PODO WISESO, S.Kom',
      positionBold: 'STAFF',
      position: 'MEL Staff',
      imageUrl: '/images/strukturOrganisasi/podo.svg',
    },
    {
      name: 'AZHARUL FAZRI SIAGIAN, S.Pd',
      positionBold: 'STAFF',
      position: 'MEL Staff',
      imageUrl: '/images/strukturOrganisasi/azharul.svg',
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

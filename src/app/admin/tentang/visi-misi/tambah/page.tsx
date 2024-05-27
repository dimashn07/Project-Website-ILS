'use client'
import React, { useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { FormVisi } from "@/components/Admin/Form/FormVisi";
import { FormMisi } from "@/components/Admin/Form/FormMisi";
import { useRouter } from "next/navigation";
import { addVisi } from "@/app/admin/controller/visi";
import { addMisi } from "@/app/admin/controller/misi";

const TambahVisiMisiPage = () => {
    const [deskripsi, setDeskripsi] = useState('');

    const router = useRouter();

    // const handleSimpanVisiClick = async(e) => {
    //     e.preventDefault();
    //       const added = await addVisi(deskripsi);
    //       if(added){
    //         setDeskripsi('');
            
    //         alert('Data berhasil ditambahkan')
    //         router.push('./');
    //       }
    //   };
  
    const handleSimpanMisiClick = async(e) => {
      e.preventDefault();
        const added = await addMisi(deskripsi);
        if(added){
          setDeskripsi('');
          
          alert('Data berhasil ditambahkan')
          router.push('./');
        }
    };

    return (
        <>
            <Breadcrumb
                pageName="Visi Misi"
                description="Visi dan Misi Lembaga Inisiatif Lampung Sehat"
            />

            <div className="mx-10 mb-20 flex flex-col items-center justify-center">
                {/* <div className="max-w-lg w-full px-4"> 
                    <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Visi</h1>
                    <FormVisi handleSimpanClick={handleSimpanVisiClick} deskripsi={deskripsi} setDeskripsi={setDeskripsi}/>
                </div> */}
                <div className="max-w-lg w-full px-4"> 
                    <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Tambah Misi</h1>
                    <FormMisi handleSimpanClick={handleSimpanMisiClick} deskripsi={deskripsi} setDeskripsi={setDeskripsi}/>
                </div>
            </div>
        </>
    )
}

export default TambahVisiMisiPage;
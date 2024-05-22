'use client'
import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { FormVisi } from "@/components/Admin/Form/FormVisi";
import { useRouter } from "next/navigation";

const UbahVisiPage = () => {
    const router = useRouter();

    const handleSimpanClick = () => {
        alert('Data berhasil ditambahkan');
        router.push('./');
    }

    return (
        <>
            <Breadcrumb
                pageName="Visi Misi"
                description="Visi dan Misi Lembaga Inisiatif Lampung Sehat"
            />

            <div className="mx-10 mb-20 flex flex-col items-center justify-center">
                <div className="max-w-lg w-full px-4"> 
                    <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Visi</h1>
                    <FormVisi handleSimpanClick={handleSimpanClick}/>
                </div>
            </div>
        </>
    )
}

export default UbahVisiPage;
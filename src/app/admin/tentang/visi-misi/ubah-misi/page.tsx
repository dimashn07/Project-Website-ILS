'use client'
import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { FormMisi } from "@/components/Admin/Form/FormMisi";
import { useRouter } from "next/navigation";

const UbahMisiPage = () => {
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
                    <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Misi</h1>
                    <FormMisi handleSimpanClick={handleSimpanClick}/>
                </div>
            </div>
        </>
    )
}

export default UbahMisiPage;
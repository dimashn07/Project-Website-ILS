'use client'
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { FormVisi } from "@/components/Admin/Form/FormVisi";

const UbahVisiPage = () => {
    const [deskripsi, setDeskripsi] = useState('');
    const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    const fetchVisiData = async(id: string) => {
        const docRef = doc(db, 'visi', id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            setSelectedItem({id: docSnap.id, ...docSnap.data()});
            setDeskripsi(docSnap.data().deskripsi);
        }else{
            console.error('Data tidak ditemukan')
        }
    }

    useEffect(() => {
        const visiId = searchParams?.get('id');
        if(visiId){
            fetchVisiData(visiId);
        }
    }, [searchParams]);

    const handleSimpanClick = async (e) => {
        e.preventDefault();
        if (selectedItem) {
          try {
            const updatedVisi = {
              deskripsi,
              timestamp: serverTimestamp(),
            };
            const visiRef = doc(db, 'visi', selectedItem.id);
            await updateDoc(visiRef, updatedVisi);
    
            setDeskripsi('');
            setSelectedItem(null);
    
            alert('Data berhasil diubah');
            router.push('./');
          } catch (error) {
            console.error('ERROR', error);
          }
        }
      };

    return (
        <>
            <Breadcrumb
                pageName="Visi Misi"
                description="Visi dan Misi Lembaga Inisiatif Lampung Sehat"
            />

            <div className="mx-10 mb-20 flex flex-col items-center justify-center">
                <div className="max-w-lg w-full px-4"> 
                    <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Visi</h1>
                    <FormVisi handleSimpanClick={handleSimpanClick} deskripsi={deskripsi} setDeskripsi={setDeskripsi}/>
                </div>
            </div>
        </>
    )
}

export default UbahVisiPage;
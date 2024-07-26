'use client'
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { FormMisi } from "@/components/Admin/Form/FormMisi";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import AdminLayout from "../../layout";
import { useSession } from "next-auth/react";

const UbahMisiPage = () => {
    const [deskripsi, setDeskripsi] = useState('');
    const [selectedItem, setSelectedItem] = useState<{ [key: string]: any } | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session } = useSession();

    const fetchMisiData = async(id: string) => {
        const docRef = doc(db, 'misi', id);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            setSelectedItem({id: docSnap.id, ...docSnap.data()});
            setDeskripsi(docSnap.data().deskripsi);
        }else{
            console.error('Data tidak ditemukan')
        }
    }

    useEffect(() => {
        const misiId = searchParams?.get('id');
        if(misiId){
            fetchMisiData(misiId);
        }
    }, [searchParams]);

    const handleSimpanClick = async (e) => {
        e.preventDefault();
        if (selectedItem && session && session.user) {
            try {
              const updatedMisi = {
                deskripsi,
                author: session.user.email,
                timestamp: serverTimestamp(),
              };
            const misiRef = doc(db, 'misi', selectedItem.id);
            await updateDoc(misiRef, updatedMisi);
    
            setDeskripsi('');
            setSelectedItem(null);
    
            alert('Data berhasil diubah');
            router.push('../');
          } catch (error) {
            console.error('ERROR', error);
          }
        }
      };

    return (
        <>
        <AdminLayout>
            <Breadcrumb
                pageName="Visi Misi"
                description="Visi dan Misi Lembaga Inisiatif Lampung Sehat"
            />

            <div className="mx-10 mb-20 flex flex-col items-center justify-center">
                <div className="max-w-lg w-full px-4"> 
                    <h1 className="text-2xl text-center font-semibold mb-4 mt-8">Ubah Data Misi</h1>
                    <FormMisi handleSimpanClick={handleSimpanClick} deskripsi={deskripsi} setDeskripsi={setDeskripsi}/>
                </div>
            </div>
        </AdminLayout>
        </>
    )
}

export default UbahMisiPage;
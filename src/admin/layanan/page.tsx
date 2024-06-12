'use client'
import Breadcrumb from "@/components/Common/Breadcrumb";
import AdminLayout from "../layout";
import { editStatus, getLayanan } from "@/controller/layanan";
import { useSession } from "next-auth/react";
import LayananModal from "@/components/Admin/Layanan/Modal";
import { useEffect, useState } from "react";

const LayananTable = () => {
  const [layanan, setLayanan] = useState<{ [key: string]: any }[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    async function getData() {
      const layanan = await getLayanan(session);
      setLayanan(layanan);
    }
    getData();
  }, [session]);

  return (
    <AdminLayout>
      <Breadcrumb
        pageName="Layanan"
        description="Layanan Lembaga Inisiatif Lampung Sehat"
      />

      <div className='text-center'>
        <h1 className="mb-8 text-2xl font-bold text-black dark:text-white">
          Daftar Layanan Masyarakat
        </h1>
      </div>
      <div className="mx-10 mb-20 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-0.5/5"> 
                No
              </th>
              <th scope="col" className="px-6 py-3 w-1/5"> 
                Nama
              </th>
              <th scope="col" className="px-6 py-3 w-1/5"> 
                Jenis Pertanyaan
              </th>
              <th scope="col" className="px-6 py-3 w-1/5"> 
                Tanggal Pengaduan
              </th>
              <th scope="col" className="px-6 py-3 w-1/5"> 
                Status
              </th>
              <th scope="col" className="px-6 py-3 w-1/5"> 
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {layanan.map((item, index) => (
              <tr key={item.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  {item.nama}
                </td>
                <td className="px-6 py-4">
                  {item.jenisLayanan}
                </td>
                <td className="px-6 py-4">
                  {item.timestamp?.toDate().toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-block px-3 py-1 rounded-md ${item.status === 'Ditanggapi' ? 'bg-green-500 text-white dark:bg-green-400 dark:text-gray-900' : 'bg-red-500 text-white dark:bg-red-400 dark:text-gray-900'}`}>
                    {item.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <LayananModal layananItem={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default LayananTable;

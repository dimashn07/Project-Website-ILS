'use client'
import Breadcrumb from "@/components/Common/Breadcrumb";
import LayananForm from "@/components/LayananForm";
import { addLayanan } from "@/controller/layanan";
import { sendLayananForm } from "lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LayananPage = () => {
  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [jenisLayanan, setJenisLayanan] = useState('');
  const [kabupaten, setKabupaten] = useState('');
  const [puskesmas, setPuskesmas] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  const handleSimpanClick = async (e) => {
    e.preventDefault();
    const added = await addLayanan(nama, jenisKelamin, whatsapp, email, jenisLayanan, kabupaten, puskesmas, keterangan);
    if (added) {
      setNama('');
      setJenisKelamin('');
      setWhatsapp('');
      setEmail('');
      setJenisLayanan('');
      setKabupaten('');
      setPuskesmas('');
      setKeterangan('');

      setShowPopup(true);
    }
    await sendLayananForm({nama, jenisKelamin, whatsapp, email, jenisLayanan, kabupaten, puskesmas, keterangan});
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    router.push('../');
  };

  return (
    <>
      <Breadcrumb
        pageName="Layanan"
        description="Layanan Lembaga Inisiatif Lampung Sehat"
      />

      <div className="mt-4 mx-auto">
        <LayananForm 
          handleSimpanClick={handleSimpanClick}
          nama={nama} setNama={setNama}
          jenisKelamin={jenisKelamin} setJenisKelamin={setJenisKelamin}
          email={email} setEmail={setEmail}
          whatsapp={whatsapp} setWhatsapp={setWhatsapp}
          jenisLayanan={jenisLayanan} setJenisLayanan={setJenisLayanan}
          kabupaten={kabupaten} setKabupaten={setKabupaten}
          puskesmas={puskesmas} setPuskesmas={setPuskesmas}
          keterangan={keterangan} setKeterangan={setKeterangan}
        />
      </div>

      {showPopup && (
        <div id="popup-modal" tabIndex={-1} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-opacity-70">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-green-500 w-12 h-12 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Data berhasil dikirim!</h3>
                <h5 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Admin akan segera menghubungi Anda.</h5>
                <button
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={handleClosePopup}
                >
                  Oke
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayananPage;

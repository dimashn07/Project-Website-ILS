'use client'
import { db } from '@/app/firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const LayananForm = ({ handleSimpanClick, nama, setNama, jenisKelamin, setJenisKelamin, email, setEmail, whatsapp, setWhatsapp, jenisLayanan, setJenisLayanan, kabupaten, setKabupaten, puskesmas, setPuskesmas, keterangan, setKeterangan }) => {

  const [sebaranWilayah, setSebaranWilayah] = useState<{ [key: string]: any }[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'sebaranWilayah'), orderBy('urutan', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let sebaranWilayahArr: { id: string }[] = []; 
  
      querySnapshot.forEach((doc) => {
        sebaranWilayahArr.push({...doc.data(), id: doc.id})
      });
  
      setSebaranWilayah(sebaranWilayahArr);
    })
  
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section id="contact" className="overflow-hidden py-4 md:py-6 lg:py-8 pb-20">
      <div className="container flex justify-center">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12 mx-auto">
            <div
              className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Hai, ada yang bisa kami bantu?
              </h2>
              <p className="mb-12 text-base font-medium text-body-color text-justify">
                Kirimkan pesan atau pertanyaan Anda melalui formulir di bawah ini. Kami akan segera merespons pertanyaan Anda.
              </p>
              <form onSubmit={handleSimpanClick}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="nama"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Nama
                      </label>
                      <input
                        type="text" id="nama" name="nama" required
                        value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukan Nama Anda"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="jenisKelamin"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Jenis Kelamin
                      </label>
                      <div className="relative">
                        <select
                          id="jenisKelamin" name="jenisKelamin" required
                          value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)}
                          className="appearance-none border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        >
                          <option value="" disabled selected hidden>Pilih Jenis Kelamin</option>
                          <option value="Laki-Laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400 dark:text-gray-300"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="whatsapp"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        No. Whatsapp
                      </label>
                      <input
                        type="text" id="whatsapp" name="whatsapp" required
                        value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="Masukan Nomor WhatsApp Anda"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email" id="email" name="email" required
                        value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukan E-mail Anda"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="kabupaten"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Kabupaten/Kota
                      </label>
                      <select
                        id="kabupaten"
                        name="kabupaten"
                        value={kabupaten}
                        onChange={(e) => setKabupaten(e.target.value)}
                        className="appearance-none border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      >
                        <option value="" disabled hidden>Pilih Kabupaten/Kota</option>
                        {sebaranWilayah.map(wilayah => (
                          <option key={wilayah.id} value={wilayah.wilayah}>{wilayah.wilayah}</option>
                        ))}
                      </select>
                      {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400 dark:text-gray-300"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div> */}
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="puskesmas"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Puskesmas Terdekat
                      </label>
                      <input
                        type="text" id="puskesmas" name="puskesmas" required
                        value={puskesmas} onChange={(e) => setPuskesmas(e.target.value)} placeholder="Masukan Puskesmas"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="jenisLayanan"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Jenis Layanan
                      </label>
                      <div className="relative">
                        <select
                          id="jenisLayanan" name="jenisLayanan" required
                          value={jenisLayanan} onChange={(e) => setJenisLayanan(e.target.value)}
                          className="appearance-none border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        >
                          <option value="" disabled selected hidden>Pilih Jenis Layanan</option>
                          <option value="Pelayanan Publik">Pelayanan Publik</option>
                          <option value="Resisten Obat">Resisten Obat</option>
                          <option value="Temuan Kasus">Temuan Kasus</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400 dark:text-gray-300"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="keterangan"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Keterangan
                      </label>
                      <textarea
                        id="keterangan" name="keterangan" required
                        value={keterangan} onChange={(e) => setKeterangan(e.target.value)}
                        rows={5}
                        placeholder="Masukan Keterangan"
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4 flex justify-end">
                    <button type="submit" onClick={handleSimpanClick} className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      Kirim
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayananForm;

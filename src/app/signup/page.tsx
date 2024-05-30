'use client'
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const SignUpPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const router = useRouter();

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Selamat Datang!
                </h3>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Daftar Akun Admin
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                </div>
                <div className="mb-8">
                  <label htmlFor="email" className="mb-2 block text-sm text-dark dark:text-white">
                    E-mail
                  </label>
                  <input 
                    type="email" id="email" name="email" placeholder="Masukkan akun e-mail"
                    autoComplete="email" onChange={(e) => setEmail(e.target.value)} required
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="password" className="mb-3 block text-sm text-dark dark:text-white">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Masukkan kata sandi"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="password" className="mb-3 block text-sm text-dark dark:text-white">
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    type="password"
                    id="passwordAgain"
                    name="passwordAgain"
                    placeholder="Masukkan konfirmasi kata sandi"
                    autoComplete="current-password"
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    required
                    className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  />
                </div>
                <div className="mb-6">
                  <button 
                    onClick={() => signUp()}
                    disabled={!email || !password || !passwordAgain || password!=passwordAgain}
                    className="disabled:opacity-40 shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                    Daftar
                  </button>
                </div>
                <div className="text-center text-base font-medium text-body-color">
                  Sudah Punya Akun? {" "}
                  <span onClick={handleLoginClick} className="cursor-pointer text-primary hover:underline" >
                    Masuk
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
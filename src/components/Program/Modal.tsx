import { db } from '@/app/firebaseConfig';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const [modal, setModal] = useState<{ [key: string]: any }[]>([]);

    useEffect(() => {
      const q = query(collection(db, 'modal'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let modalArr: { id: string }[] = []; 
    
        querySnapshot.forEach((doc) => {
          modalArr.push({...doc.data(), id: doc.id})
        });
    
        setModal(modalArr);
      })
    
      return () => {
        unsubscribe();
      };
    }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest('.modal-content')) {
        onClose();
      }
    };

    const disableBodyScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableBodyScroll = () => {
      document.body.style.overflow = 'auto';
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('click', handleClickOutside);
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('click', handleClickOutside);
      enableBodyScroll();
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none modal-content p-0">
              {modal.map((item) => (
                <div className="relative my-8 p-6 pt-0 flex-auto">
                  <img
                    src={item.gambar}
                    alt="Image"
                    className="w-full h-auto"
                  />
                  <div className="mt-4 text-black text-md text-justify leading-relaxed">
                    <span className="font-bold">Inisiatif Lampung Sehat -</span>
                    <span> {item.deskripsi} </span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center p-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-red-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

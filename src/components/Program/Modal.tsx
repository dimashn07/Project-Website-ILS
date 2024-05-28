import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose }) => {
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
              <div className="relative flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                </button>
              </div>
              <div className="relative p-6 pt-0 flex-auto">
                <img
                  src="/images/hero/popup-image.png"
                  alt="Image"
                  className="w-full h-auto"
                />
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
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

"use client"

import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default Popup;

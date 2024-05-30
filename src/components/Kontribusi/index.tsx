import React from 'react';
import CardSlider from './cardSlider';
import './index.css';

const Kontribusi = () => {
  return (
    <div className = "kontribusi">
    <main className="bg-[#efefef] dark:bg-bg-color-dark py-16 md:py-20 lg:py-28" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '50px'}}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Kontribusi</h1>
        <p style={{ fontSize: '1rem' }}> Berikut Capaian Kontribusi Lembaga Inisiatif Lampung Sehat dalam Penemuan dan Pendampingan Pasien TB di Provinsi Lampung :</p>
      </div>
      
      <div style={{ margin: '0 auto' }}> 
        <CardSlider />
      </div>
      
    </main>
    </div>
  );
};

export default Kontribusi;

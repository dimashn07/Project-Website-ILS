import React from "react";
import Slider from "./Slider";
import Popup from "./Popup";

const Program = () => {
  return (
    <main className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Popup />
      <div style={{ marginTop: '35px', marginBottom: 'auto' }}>
        <Slider />
      </div>
    </main>
  );
};

export default Program;

import React from 'react';
import CustomMap from './customMap';

const Wilayah = ({ nama, alamat, petaMarkers }) => {
  const center = petaMarkers.length > 0 ? petaMarkers[0].position : { lat: -5.385181300240061, lng: 105.2740416303906 };

  return (
    <div className="mb-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{nama}</h2>
      <div className="flex">
        <div className="w-1/2 pr-4">
          <p className="text-lg">{alamat}</p>
        </div>
        <div className="w-1/2">
          <CustomMap
            markers={petaMarkers}
            center={center}
          />
        </div>
      </div>
    </div>
  );
};

export default Wilayah;

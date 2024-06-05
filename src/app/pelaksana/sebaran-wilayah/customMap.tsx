"use client"

import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

type MarkerType = {
  position: { lat: number, lng: number },
  title: string,
  address: {
    line1: string,
    line2: string,
    line3: string,
    line4: string,
    link: string
  }
};

const CustomMap = ({ markers, center }: { markers: MarkerType[], center: { lat: number, lng: number } }) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(markers[0] || null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBkWQ9aZByT37smbe_M_-QLXoNZ3KAlnZI',
  });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    // Handle map click event if needed
  };

  const handleMarkerClick = (marker: MarkerType, index: number) => {
    setSelectedMarker(marker);
  };

  const adjustedCenter = {
    lat: center.lat + 0.002,
    lng: center.lng
  };

  return (
    <div className="relative w-full" style={{ height: '300px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', borderRadius: '8px' }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '8px' }}
          center={adjustedCenter}
          zoom={15}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} onClick={() => handleMarkerClick(marker, index)} />
          ))}
        </GoogleMap>
      )}
      {selectedMarker && (
        <div className="absolute top-2 left-2 bg-white p-2 rounded-lg shadow-md max-w-xs">
          <h3 className="text-sm font-semibold">{selectedMarker.title}</h3>
          <p className="text-xs">{selectedMarker.address.line1}, {selectedMarker.address.line2}</p>
          <p className="text-xs">{selectedMarker.address.line3}, {selectedMarker.address.line4}</p>
          <p>
            <a href={selectedMarker.address.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs">View on Google Maps</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomMap;


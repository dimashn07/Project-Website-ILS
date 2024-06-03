import React, { useEffect } from 'react';

const SosialMediaEmbed = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute('data-use-service-core', '');
    script.defer = true;
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="elfsight-app-d4172c97-c603-44a2-8ba3-2e9ecc2ebe65" data-elfsight-app-lazy></div>
    </div>
  );
};

export default SosialMediaEmbed;
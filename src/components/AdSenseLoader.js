// AdSenseLoader.js
import { useEffect } from 'react';

const AdSenseLoader = () => {
  useEffect(() => {
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        console.log('AdSense script loaded');
      };
      document.head.appendChild(script);
    }
  }, []);

  return null;
};

export default AdSenseLoader;
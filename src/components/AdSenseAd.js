import React, { useEffect, useState } from "react";
import "../styles/AdSenseAd.css";

const AdSenseAd = ({ 
  slotId, 
  format = "rectangle", 
  layoutKey = "",
  testMode = false,
  timeout = 2000
}) => {
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    let timer;
    
    if (!testMode) {
      // Load AdSense script if not already loaded
      if (!window.adsbygoogle) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID`;
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }

      timer = setTimeout(() => {
        setAdFailed(true);
      }, timeout);
    }

    return () => clearTimeout(timer);
  }, [testMode, timeout]);

  const getAdFormat = () => {
    const formats = {
      rectangle: "rectangle",
      leaderboard: "horizontal",
      banner: "auto",
      vertical: "vertical",
      fluid: "fluid"
    };
    return formats[format] || "auto";
  };

  if (testMode) {
    return (
      <div className={`ad-test-mode ${format}`}>
        <p>AdSense Test Mode ({format})</p>
        <p>Slot: {slotId}</p>
      </div>
    );
  }

  return (
    <div className="ad-container">
      {!adFailed ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
          data-ad-slot={slotId}
          data-ad-format={getAdFormat()}
          data-full-width-responsive="true"
          data-ad-layout-key={layoutKey}
        />
      ) : (
        <div className={`ad-fallback ${format}`}>
          <p>Advertisement ({format})</p>
        </div>
      )}
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  );
};

export default AdSenseAd;
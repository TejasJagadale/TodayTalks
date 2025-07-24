import React, { useEffect, useState } from "react";
import "../styles/AdSenseAd.css";

const AdSenseAd = ({
  slotId = "3581145953",
  format = "auto",
  layoutKey = "",
  testMode = false,
  timeout = 5000 // Increased timeout
}) => {
  const [adFailed, setAdFailed] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (testMode || scriptLoaded) return;

    let timer;
    let script;

    const loadAd = () => {
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
        setAdFailed(true);
      }
    };

    if (!window.adsbygoogle) {
      script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1915488793968759';
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        setScriptLoaded(true);
        loadAd();
      };
      document.head.appendChild(script);
    } else {
      loadAd();
    }

    timer = setTimeout(() => {
      setAdFailed(true);
    }, timeout);

    return () => {
      clearTimeout(timer);
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [testMode, timeout, slotId, scriptLoaded]);

  const getAdStyle = () => {
    const styles = {
      display: "block",
      overflow: "hidden" // Added to prevent layout shifts
    };

    if (format === "horizontal") {
      styles.width = "100%";
      styles.height = "90px";
    } else if (format === "rectangle") {
      styles.width = "300px";
      styles.height = "250px";
    }

    return styles;
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
          style={getAdStyle()}
          data-ad-client="ca-pub-1915488793968759"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-ad-layout-key={layoutKey}
          data-full-width-responsive="true"
        ></ins>
      ) : (
        <div className={`ad-fallback ${format}`}>
          <p>Advertisement</p>
        </div>
      )}
    </div>
  );
};

export default AdSenseAd;
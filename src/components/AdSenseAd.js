import React, { useEffect, useState } from "react";
import "../styles/AdSenseAd.css";

const AdSenseAd = ({
  slotId = "3581145953",
  format = "auto",
  layoutKey = "",
  testMode = false,
  timeout = 2000
}) => {
  const [adFailed, setAdFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let timer;

    const loadAd = () => {
      try {
        if (window.adsbygoogle && !loaded) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setLoaded(true);
        }
      } catch (e) {
        console.error("AdSense error:", e);
        setAdFailed(true);
      }
    };

    if (!testMode) {
      timer = setTimeout(() => {
        setAdFailed(true);
      }, timeout);

      loadAd();
    }

    return () => {
      clearTimeout(timer);
      // Reset loaded state when slotId changes
      setLoaded(false);
    };
  }, [testMode, timeout, slotId, loaded]);

  const getAdStyle = () => {
    const styles = {
      display: "block"
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
          data-full-width-responsive="true"
          data-ad-layout-key={layoutKey}
        />
      ) : (
        <div className={`ad-fallback ${format}`}>
          <p>Advertisement</p>
        </div>
      )}
    </div>
  );
};

export default AdSenseAd;
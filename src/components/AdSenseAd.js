import React from "react";
import "../styles/AdSenseAd.css";

const AdSenseAd = ({ format = "rectangle" }) => {
  return (
    <div className="ad-container">
      <div className={`ad-box ${format}`}>
        <p>Advertisement ({format})</p>
      </div>
    </div>
  );
};

export default AdSenseAd;

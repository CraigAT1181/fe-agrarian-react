import React from "react";

const Banner = ({ monthYear }) => {
  return (
    <div className="banner-container">
      <div>
        <h5 className="mb-0 text-white">{monthYear}</h5>
      </div>
    </div>
  );
};

export default Banner;

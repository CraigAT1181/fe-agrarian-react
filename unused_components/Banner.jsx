import React from "react";

// Banner component to display a month and year title
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

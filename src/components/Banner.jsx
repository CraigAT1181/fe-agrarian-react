import React from "react";

const Banner = ({ monthYear }) => {
  return (
    <div className="banner">
      <div className="row align-items-center">
        <div className="col-auto">
          <h5 className="m-0">{monthYear}</h5>
        </div>
        <div className="col">
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Banner;

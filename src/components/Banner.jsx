import React from "react";

const Banner = ({ monthYear }) => {
  return (
    <div>
      <div>
        <div>
          <h5>{monthYear}</h5>
        </div>
        <div>
          <hr style={{ width: "95%" }} />
        </div>
      </div>
    </div>
  );
};

export default Banner;

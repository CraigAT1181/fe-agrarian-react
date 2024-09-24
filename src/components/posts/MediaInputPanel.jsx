import React from "react";

export default function MediaInputPanel() {
  const handleMediaIconClick = () => {};

  return (
    <div className="media-input-panel">
      <div
        title="Open camera"
        className="media-icons"
        onClick={() => handleMediaIconClick()}
      >
        <i className="fa-solid fa-camera"></i>
      </div>
      <div
        title="Choose media from phone"
        className="media-icons"
        onClick={() => handleMediaIconClick()}
      >
        <i className="fa-solid fa-image"></i>
      </div>
    </div>
  );
}

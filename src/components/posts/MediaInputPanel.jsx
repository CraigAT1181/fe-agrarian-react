import React, { useRef } from "react";

export default function MediaInputPanel({ handleMediaUpload }) {
  const cameraInputRef = useRef(null); // Reference for the camera input
  const mediaInputRef = useRef(null); // Reference for the media storage input

  // Trigger the file input dialog for camera capture
  const handleCameraClick = () => {
    cameraInputRef.current.click();
  };

  // Trigger the file input dialog for media storage
  const handleMediaClick = () => {
    mediaInputRef.current.click();
  };

  return (
    <div className="media-input-panel">
      {/* Camera icon to trigger camera input */}
      <div
        title="Open camera"
        className="media-icons"
        onClick={handleCameraClick}
      >
        <i className="fa-solid fa-camera"></i>
      </div>

      {/* Media icon to trigger file input for media selection */}
      <div
        title="Choose media from phone"
        className="media-icons"
        onClick={handleMediaClick}
      >
        <i className="fa-solid fa-image"></i>
      </div>

      {/* Hidden input for camera capture */}
      <input
        type="file"
        accept="image/*"
        capture="environment" // Activates the camera
        ref={cameraInputRef}
        style={{ display: "none" }}
        onChange={handleMediaUpload}
      />

      {/* Hidden input for selecting media from storage */}
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        ref={mediaInputRef}
        style={{ display: "none" }}
        onChange={handleMediaUpload}
      />
    </div>
  );
}

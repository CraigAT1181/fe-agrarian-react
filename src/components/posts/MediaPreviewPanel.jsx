import React from "react";

export default function MediaPreviewPanel({ mediaUploads, setMediaUploads }) {
  const removeMedia = (index) => {
    setMediaUploads((prevMediaUploads) =>
      prevMediaUploads.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="media-preview-panel">
      {mediaUploads.map((preview, index) => (
        <div key={index} className="media-preview-image-container">
          <img
            src={URL.createObjectURL(preview)}
            alt="Uploaded media preview"
            className="w-full h-20 object-cover"
          />
          <button
            className="remove-media-button"
            onClick={() => removeMedia(index)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}

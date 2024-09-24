import React from "react";

export default function MediaPreviewPanel() {
  const previews = ["a", "b", "c"];

  return (
    <div className="flex">
      {previews.map((preview, index) => {
        <div key={index}>{preview}</div>;
      })}
    </div>
  );
}

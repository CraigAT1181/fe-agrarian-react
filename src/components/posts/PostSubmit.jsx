import React, { useState } from "react";
import MediaInputPanel from "./MediaInputPanel";
import MediaPreviewPanel from "./MediaPreviewPanel";

export default function PostSubmit() {
  const [replyContent, setReplyContent] = useState("");
  const [mediaUploads, setMediaUploads] = useState([]);

  const handleReplySubmit = (e) => {
    e.preventDefault();

    setReplyContent("");
  };

  return (
    <div>
      <div className="mt-2" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleReplySubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            onClick={(e) => e.stopPropagation()}
            placeholder="Write your reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <MediaInputPanel />
          <button
            type="submit"
            className="mt-2 bg-gray-700 text-white px-4 py-2 rounded"
            onClick={(e) => e.stopPropagation()}
          >
            Reply
          </button>
        </form>
        {mediaUploads && mediaUploads.length > 0 && <MediaPreviewPanel />}
      </div>
    </div>
  );
}

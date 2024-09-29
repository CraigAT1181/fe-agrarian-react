import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import MediaInputPanel from "./MediaInputPanel";
import MediaPreviewPanel from "./MediaPreviewPanel";

export default function PostSubmit({ parent_id = null, scope = null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [mediaUploads, setMediaUploads] = useState([]);

  const { user, handleNewPost, error, setError } = useAuth();

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setMediaUploads([...mediaUploads, ...files]);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      setError("Reply content required.");
      return;
    }

    const newPost = new FormData();
    newPost.append("user_id", user.user_id);
    newPost.append("parent_id", parent_id);
    newPost.append("content", replyContent);
    newPost.append("is_reply", !!parent_id);
    newPost.append("town_id", user.town_id);
    newPost.append("allotment_id", user.allotment_id);
    newPost.append("scope", scope);

    mediaUploads.forEach((file) => {
      newPost.append("media_files", file);
    });

    setIsLoading(true);
    await handleNewPost(newPost, scope);

    setReplyContent("");
    setMediaUploads([]);
    setIsLoading(false);
  };

  return (
    <div
      className="mt-2 max-w-full"
      onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleReplySubmit}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          onClick={(e) => {
            e.stopPropagation();
            setError(null);
          }}
          placeholder="Write your reply..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        />
        <MediaInputPanel handleMediaUpload={handleMediaUpload} />
        {mediaUploads && mediaUploads.length > 0 && (
          <MediaPreviewPanel
            mediaUploads={mediaUploads}
            setMediaUploads={setMediaUploads}
          />
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-2 bg-green-900 text-white px-4 py-2 rounded"
          onClick={(e) => e.stopPropagation()}>
          {isLoading ? <i className="fa-solid fa-spinner"></i> : "Reply"}
        </button>
      </form>
    </div>
  );
}

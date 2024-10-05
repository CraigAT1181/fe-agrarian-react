import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import MediaInputPanel from "./MediaInputPanel";
import MediaPreviewPanel from "./MediaPreviewPanel";

export default function PostSubmit({
  parent_id = null,
  scope = null,
  onAddPost,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [mediaUploads, setMediaUploads] = useState([]);

  const { user } = useAuth();

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalUploads = mediaUploads.length + files.length;

    // If adding these files exceeds the limit of 4
    if (totalUploads > 4) {
      const allowedFiles = files.slice(0, 4 - mediaUploads.length); // Allow only the remaining space
      setMediaUploads([...mediaUploads, ...allowedFiles]);
      alert(
        `You can only upload up to 4 items. ${
          totalUploads - 4
        } file(s) were not added.`
      );
    } else {
      setMediaUploads([...mediaUploads, ...files]);
    }
  };

  const handlePostSubmission = async (e) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      return;
    }

    const newPost = new FormData();
    newPost.append("user_id", user.user_id);
    newPost.append("content", replyContent);
    newPost.append("is_reply", !!parent_id);
    newPost.append("town_id", user.town_id);
    newPost.append("allotment_id", user.allotment_id);
    newPost.append("scope", scope);

    if (parent_id && parent_id.trim() !== "") {
      newPost.append("parent_id", parent_id);
    }

    mediaUploads.forEach((file) => {
      newPost.append("media_files", file);
    });

    setIsLoading(true);
    try {
      await onAddPost(newPost);
    } catch (error) {
      console.error("Error submitting post:", error);
      setError("Failed to submit the post.");
    } finally {
      setReplyContent("");
      setMediaUploads([]);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="border-2 border-green-900 p-2 rounded-lg max-w-full text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handlePostSubmission}>
        <textarea
          className="w-full p-2 border-1 border-green-900 rounded outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setError(null);
          }}
          placeholder="What's on your mind?"
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
        {error && (
          <div className="text-center">
            <p className="text-red-500 bg-white rounded-md p-1 mt-2">{error}</p>
          </div>
        )}
        <button
          type="submit"
          className="mt-2 bg-white border-1 border-green-900 text-green-900 font-semibold px-4 py-2 rounded"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Confirm"
          )}
        </button>
      </form>
    </div>
  );
}

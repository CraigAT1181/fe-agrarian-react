import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import MediaInputPanel from "./MediaInputPanel";
import MediaPreviewPanel from "./MediaPreviewPanel";
import { addPost } from "../../api/api";

export default function PostSubmit({ parent_id = null, scope = null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [mediaUploads, setMediaUploads] = useState([]);

  const { user, handleNewPost } = useAuth();

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setMediaUploads([...mediaUploads, ...files]);
    }
  };
  console.log("user", user);

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      setError("Reply content required.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user.user_id);
    formData.append("parent_id", parent_id);
    formData.append("content", replyContent);
    formData.append("is_reply", parent_id ? "true" : "false");
    formData.append("town_id", user.town_id);
    formData.append("allotment_id", user.allotment_id);
    formData.append("scope", scope);

    mediaUploads.forEach((file) => {
      formData.append("media_files", file);
    });

    setIsLoading(true);
    addPost(formData)
      .then((newPost) => {
        console.log(newPost, "newPost");
        handleNewPost(newPost);
        setReplyContent("");
        setMediaUploads([]);
        setIsLoading(false);
      })
      .catch(({ error }) => {
        console.error(error);
        setError(error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-2 max-w-full" onClick={(e) => e.stopPropagation()}>
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
          onClick={(e) => e.stopPropagation()}
        >
          Reply
        </button>
      </form>
    </div>
  );
}

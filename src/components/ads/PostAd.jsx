import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Modal } from "react-bootstrap";
import MediaInputPanel from "../posts/MediaInputPanel";
import MediaPreviewPanel from "../posts/MediaPreviewPanel";

export default function PostAd({ show, handleClose, handlePostAd }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  const [mediaUploads, setMediaUploads] = useState([]);

  const maxTitleLength = 30;
  const maxContentLength = 150;

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

  const handleNewAd = async (title, content, mediaUploads) => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    const newAd = new FormData();
    newAd.append("user_id", user.user_id);
    newAd.append("town_id", user.town_id);
    newAd.append("title", title);
    newAd.append("content", content);

    mediaUploads.forEach((file) => {
      newAd.append("media_files", file);
    });

    setIsLoading(true);
    try {
      await handlePostAd(newAd);
    } catch (error) {
      console.error("Error submitting ad:", error);
      setError("Failed to post ad.", error);
    } finally {
      setTitle("");
      setContent("");
      setMediaUploads([]);
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Write your ad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="adTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control border-2 border-green-900"
              id="adTitle"
              placeholder=""
              onChange={(e) => setTitle(e.target.value)}
              maxLength={maxTitleLength}
            />
            <p className="text-xs text-gray-500">{`${title.length}/${maxTitleLength} characters`}</p>
          </div>

          <div className="mb-3">
            <label htmlFor="adContent" className="form-label">
              Content
            </label>
            <textarea
              className="form-control border-2 border-green-900"
              id="adContent"
              rows="4"
              placeholder=""
              onChange={(e) => setContent(e.target.value)}
              maxLength={maxContentLength}
            ></textarea>
            <p className="text-xs text-gray-500">{`${content.length}/${maxContentLength} characters`}</p>
          </div>
        </form>
        <div className="bg-green-900 p-1 rounded-lg mb-2">
          <MediaInputPanel handleMediaUpload={handleMediaUpload} />
        </div>
        <div className="media-preview-container">
          {mediaUploads && mediaUploads.length > 0 && (
            <MediaPreviewPanel
              mediaUploads={mediaUploads}
              setMediaUploads={setMediaUploads}
            />
          )}
        </div>
      </Modal.Body>
      {error && (
        <div className="flex justify-center text-red-500 mb-2">
          <p className="mb-0">{error}</p>
        </div>
      )}
      <div className="flex justify-center mb-4 mx-4">
        <button
          className="border-2 border-green-900 p-2 rounded-lg"
          onClick={() => handleNewAd(title, content, mediaUploads)}
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Post Ad"
          )}
        </button>
      </div>
    </Modal>
  );
}

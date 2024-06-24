import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Modal } from "react-bootstrap";
import { createBlog } from "../api/api";
import { useDropzone } from "react-dropzone";
import "../App.css";

export default function CreateBlogModal({ show, handleClose, setNewBlog }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageData(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const handleTitleInput = (value) => {
    setTitle(value);
  };

  const handleContentInput = (value) => {
    setContent(value);
  };

  const handleTagInput = (value) => {
    setTagInput(value);
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag.toLowerCase()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCreateBlog = async () => {
    if (!title || !content) {
      setError("Title and content cannot be empty.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    if (imageData) {
      formData.append("image", imageData);
    }

    formData.append("title", title);
    formData.append("author_id", user.userID);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags));

    try {
      const data = await createBlog(formData);
      setIsLoading(false);
      if (!data.error) {
        setNewBlog(data);
        handleClose();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setIsLoading(false);
      setError("Failed to create blog. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Your Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div {...getRootProps()} className="dropzone mb-3">
            <input {...getInputProps()} />
            <p>Drag a file here, or click to select a file (.jpeg)</p>
          </div>
          {imagePreview && (
            <div className="mb-3">
              <img
                src={imagePreview}
                alt="Uploaded Image"
                style={{ maxWidth: "100%", marginBottom: "10px" }}
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="blogTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="blogTitle"
              value={title}
              onChange={({ target }) => handleTitleInput(target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              className="form-control"
              id="content"
              rows="10"
              value={content}
              onChange={({ target }) => handleContentInput(target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Tags
            </label>
            <input
              id="tags"
              className="form-control"
              type="text"
              value={tagInput}
              onChange={({ target }) => handleTagInput(target.value)}
              onKeyDown={handleTagKeyPress}
            />
          </div>
          <div className="d-flex flex-wrap">
            {tags.map((tag, index) => (
              <div key={index} className="tag-container mx-2 text-center">
                <div className="tag">{tag.toLowerCase()}</div>
                <div
                  className="badge bg-danger remove-tag"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeTag(tag)}
                >
                  X
                </div>
              </div>
            ))}
          </div>
        </form>
      </Modal.Body>
      {error && (
        <div className="text-center text-red-500 mx-2">
          <p className="mb-0">{error}</p>
        </div>
      )}
      <div className="flex justify-center mb-4 mx-4">
        <button
          className="dropdown"
          onClick={() => handleCreateBlog()}
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Create Blog"
          )}
        </button>
      </div>
    </Modal>
  );
}

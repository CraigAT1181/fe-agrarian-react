import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Modal, Button, Alert } from "react-bootstrap";
import { patchBlog } from "../api/api";
import { useDropzone } from "react-dropzone";
import "../App.css";

export default function EditBlogModal({
  show,
  handleClose,
  singleBlog,
  setEditedBlog,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  let [title, setTitle] = useState(singleBlog.title);
  let [content, setContent] = useState(singleBlog.content);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  let [imageData, setImageData] = useState(singleBlog.image_url);
  let [imagePreview, setImagePreview] = useState(singleBlog.image_url);

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
    setTagInput(() => value);
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

  const handlePatchBlog = async () => {
    if (!title || !content) {
      setError("Title and content cannot be empty.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    formData.append("image", imageData);
    formData.append("title", title);
    formData.append("author_id", user.userID);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags));

    try {
      const data = await patchBlog(singleBlog.blog_id, formData);

      setIsLoading(false);
      setEditedBlog(true);
      handleClose();
    } catch (err) {
      setIsLoading(false);
      setError("Failed to edit blog. Please try again.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Your Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div
            {...getRootProps()}
            className="dropzone mb-3">
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
            <label
              htmlFor="blogTitle"
              className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              value={title}
              id="blogTitle"
              onChange={({ target }) => handleTitleInput(target.value)}
            />
            <label
              htmlFor="content"
              className="form-label">
              Content
            </label>
            <textarea
              className="form-control"
              value={content}
              id="content"
              rows="10"
              onChange={({ target }) =>
                handleContentInput(target.value)
              }></textarea>
          </div>
          <div className="mb-3">
            <label
              htmlFor="tags"
              className="form-label">
              Tags
            </label>
            <input
              id="tags"
              className="form-control"
              type="text"
              value={tagInput}
              onChange={({ target }) => handleTagInput(target.value)}
              onKeyDown={(e) => handleTagKeyPress(e)}
            />
          </div>
          <div className="d-flex">
            {tags &&
              tags.map((tag, index) => (
                <div
                  key={index}
                  className="mx-2 text-center">
                  <div>{tag.toLowerCase()}</div>
                  <div
                    className="badge bg-danger"
                    style={{ cursor: "pointer", width: "25px" }}
                    onClick={() => removeTag(tag)}>
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
      onClick={() => handlePatchBlog()}
      disabled={isLoading}>
      {isLoading ? (
        <i className="fa-solid fa-spinner fa-spin"></i>
      ) : (
        "Edit Blog"
      )}
    </button>
  </div>
    </Modal>
  );
}

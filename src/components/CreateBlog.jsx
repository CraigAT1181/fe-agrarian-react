import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Modal, Button, Alert } from "react-bootstrap";
import { createBlog } from "../api/api";
import { useDropzone } from "react-dropzone";
import "../App.css";

export default function CreateBlogModal({ show, handleClose, setNewBlog }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  let [imageData, setImageData] = useState(null);
  let [imagePreview, setImagePreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageData(file);
    console.log(file);
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

  const handleCreateBlog = async () => {
    setIsLoading(true);

    const formData = new FormData();
    if (imageData) {
      console.log(imageData, "Image before append");
      formData.append("image", imageData);
    }

    formData.append("title", title);
    formData.append("author_id", user.userID);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags));

    try {
      console.log(formData.get("image"), "form-image IN CREATEBLOG");
      const data = await createBlog(formData);
      setIsLoading(false);
      console.log(data);
      setNewBlog(data);
      handleClose();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Blog</Modal.Title>
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
            {tags.map((tag, index) => (
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
      <Modal.Footer>
        {error && (
          <Alert variant="danger">
            <div>{error}</div>
          </Alert>
        )}
        {isLoading && (
          <div className="d-flex-col text-center mt-4">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Uploading your blog...</p>
          </div>
        )}
        <Button
          variant="secondary"
          onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={() => handleCreateBlog()}>
          Finished
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Modal, Button, Alert } from "react-bootstrap";
import { patchBlog } from "../api/api";
import { useDropzone } from "react-dropzone";
import "../App.css";

export default function EditArticleModal({
  show,
  handleClose,
  singleActivity,
  setEditedActivity,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  let [title, setTitle] = useState(singleActivity.title);
  let [description, setDescription] = useState(singleActivity.description);
  let [imageData, setImageData] = useState(singleActivity.image_url);
  let [imagePreview, setImagePreview] = useState(singleActivity.image_url);

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

  const handleDescriptionInput = (value) => {
    setDescription(value);
  };

  const handlePatchActivity = async () => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("image", imageData);
    formData.append("title", title);
    formData.append("user_id", user.userID);
    formData.append("description", description);

    try {
      console.log(formData);
      const data = await patchActivity(singleActivity.activity_id, formData);
      console.log(data);
      setIsLoading(false);
      setEditedActivity(true);
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
        <Modal.Title>Edit Your Activity</Modal.Title>
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
              htmlFor="activityTitle"
              className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              value={title}
              id="activityTitle"
              onChange={({ target }) => handleTitleInput(target.value)}
            />
            <label
              htmlFor="content"
              className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              value={description}
              id="description"
              rows="10"
              onChange={({ target }) =>
                handleDescriptionInput(target.value)
              }></textarea>
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
            <p>Updating your activity...</p>
          </div>
        )}
        <Button
          variant="secondary"
          onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={() => handlePatchActivity()}>
          Finished
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Modal, Button, Alert } from "react-bootstrap";
import { patchActivity } from "../api/api";
import { useDropzone } from "react-dropzone";
import "../App.css";

export default function EditActivityModal({
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
  let [start, setStart] = useState();
  let [end, setEnd] = useState();
  let [location, setLocation] = useState(singleActivity.location);
  let [imageData, setImageData] = useState(singleActivity.image_url);
  let [imagePreview, setImagePreview] = useState(singleActivity.image_url);

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

  const handlePatchActivity = async () => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("activity_id", singleActivity.activity_id);
    formData.append("description", description);
    formData.append("date_s_time", start);
    formData.append("date_e_time", end);
    formData.append("location", location);
    formData.append("image", imageData);

    patchActivity(user.userID, formData)
      .then((data) => {
        
        setIsLoading(false);
        setEditedActivity(true);
        handleClose();
      })
      .catch(
        ({
          response: {
            status,
            data: { error },
          },
        }) => {
          setIsLoading(false);
          setError(error);
        }
      );
  };
  console.log(error);
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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}></textarea>
            <label
              htmlFor="location"
              className="form-label mt-2">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              value={location}
              id="location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label
              htmlFor="start"
              className="form-label mt-2">
              Start Date/Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <label
              htmlFor="end"
              className="form-label mt-2">
              End Date/Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </form>
        {error && (
          <Alert variant="danger">
            <div>{error}</div>
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
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

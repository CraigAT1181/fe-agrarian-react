import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Modal } from "react-bootstrap";
import { createActivity } from "../api/api";
import { useDropzone } from "react-dropzone";

export default function CreateActivityModal({
  show,
  handleClose,
  setNewActivity,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [start, setStart] = useState("");
  let [end, setEnd] = useState("");
  let [location, setLocation] = useState("");
  let [imageData, setImageData] = useState(null);
  let [imagePreview, setImagePreview] = useState(null);

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

  function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Adding leading zeros if necessary
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }

  const handleCreateActivity = async () => {
    setIsLoading(true);

    const formData = new FormData();
    if (imageData) {
      formData.append("image", imageData);
    }

    const user_id = user.userID;
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date_s_time", start);
    formData.append("date_e_time", end);
    formData.append("location", location);

    try {
      const data = await createActivity(user_id, formData);
      setIsLoading(false);
      setNewActivity(data);
      handleClose();
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Activity</Modal.Title>
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
            <label htmlFor="title" className="form-label mt-2">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description" className="form-label mt-2">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label htmlFor="location" className="form-label mt-2">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="start" className="form-label mt-2">
              Start Date/Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="start"
              value={start ? start : ""}
              onChange={(e) => setStart(e.target.value)}
            />
            <label htmlFor="end" className="form-label mt-2">
              End Date/Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="end"
              value={end ? end : ""}
              onChange={(e) => setEnd(e.target.value)}
            />
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
          onClick={() => handleCreateActivity()}
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Create Activity"
          )}
        </button>
      </div>
    </Modal>
  );
}

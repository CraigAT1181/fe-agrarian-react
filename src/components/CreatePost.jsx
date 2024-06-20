import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import {
  Modal,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from "react-bootstrap";
import { createPost } from "../api/api";

export default function CreatePostModal({ show, handleClose, setNewPost }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  let [availableVariant, setAvailableVariant] = useState("outline-success");
  let [wantedVariant, setWantedVariant] = useState("outline-danger");
  let [seedsVariant, setSeedsVariant] = useState("outline-secondary");
  let [produceVariant, setProduceVariant] = useState("outline-primary");
  let [item, setItem] = useState("");
  let [status, setStatus] = useState("");
  let [type, setType] = useState("");
  let [body, setBody] = useState("");
  let [image, setImage] = useState("");

  const handleItemInput = (value) => {
    setItem(value);
  };

  const handleStatusSelection = (value) => {
    if (value === "Available") {
      setStatus("Available");
      setAvailableVariant("success");
      setWantedVariant("outline-danger");
    } else if (value === "Wanted") {
      setStatus("Wanted");
      setWantedVariant("danger");
      setAvailableVariant("outline-success");
    }
  };

  const handleTypeSelection = (value) => {
    if (value === "Seeds") {
      setType("Seeds");
      setSeedsVariant("secondary");
      setProduceVariant("outline-primary");
    } else if (value === "Produce") {
      setType("Produce");
      setProduceVariant("primary");
      setSeedsVariant("outline-secondary");
    }
  };

  const handleBodyInput = (value) => {
    setBody(value);
  };

  const handleCreate = (user, item, status, type, image, body) => {
    setIsLoading(true);

    createPost(user.userID, status, type, item, image, body)
      .then((data) => {
        setIsLoading(false);
        setNewPost(data);
        handleClose();
      })
      .catch(() => {
        setIsLoading(false);
        setError(
          "Ensure you've selected a Status and a Type (e.g. 'Wanted' 'Seeds')"
        );
      });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create your Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label
              htmlFor="postTitle"
              className="form-label">
              Item
            </label>
            <input
              type="text"
              className="form-control"
              id="postTitle"
              placeholder="What's the item you have or want"
              onChange={({ target }) => handleItemInput(target.value)}
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-around">
              <button
                className={`py-2 px-4 rounded-lg ${status === "Available" ? "bg-green-500 text-white" : "bg-white border border-green-500 text-green-500"}`}
                type="button"
                onClick={() => handleStatusSelection("Available")}
              >
                Available
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${status === "Wanted" ? "bg-red-500 text-white" : "bg-white border border-red-500 text-red-500"}`}
                type="button"
                onClick={() => handleStatusSelection("Wanted")}
              >
                Wanted
              </button>
            </div>
            <div className="flex justify-around mt-4">
              <button
                className={`py-2 px-4 rounded-lg ${type === "Seeds" ? "bg-gray-500 text-white" : "bg-white border border-gray-500 text-gray-500"}`}
                type="button"
                onClick={() => handleTypeSelection("Seeds")}
              >
                Seeds
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${type === "Produce" ? "bg-blue-500 text-white" : "bg-white border border-blue-500 text-blue-500"}`}
                type="button"
                onClick={() => handleTypeSelection("Produce")}
              >
                Produce
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="postContent"
              className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="postContent"
              rows="4"
              placeholder="Provide a description to allow others to find it more easily from a search"
              onChange={({ target }) =>
                handleBodyInput(target.value)
              }></textarea>
          </div>
          <div className="mb-3"></div>
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
            <p>Creating your post...</p>
          </div>
        )}
        <Button
          variant="secondary"
          onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={() => handleCreate(user, item, status, type, image, body)}>
          Create Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

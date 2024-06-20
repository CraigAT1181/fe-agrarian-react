import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Modal, Button, Alert } from "react-bootstrap";
import { createPost } from "../api/api";

export default function CreatePostModal({ show, handleClose, setNewPost }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  let [item, setItem] = useState("");
  let [status, setStatus] = useState("");
  let [type, setType] = useState("");
  let [body, setBody] = useState("");
  let [image, setImage] = useState("");

  const handleItemInput = (value) => {
    setItem(value);
  };

  const handleStatusSelection = (value) => {
    setStatus(value);
  };

  const handleTypeSelection = (value) => {
    setType(value);
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create your Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="postTitle" className="form-label">
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
          <div className="my-4">
            <div className="flex items-center">
              <span className="mr-4">Choose one:</span>
              <button
                className={`py-2 px-4 rounded-lg mx-2 ${
                  status === "Available"
                    ? "bg-green-950 text-white"
                    : "bg-white border border-green-950 text-green-950"
                }`}
                type="button"
                onClick={() => handleStatusSelection("Available")}
              >
                Available
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${
                  status === "Wanted"
                    ? "bg-green-950 text-white"
                    : "bg-white border border-green-950 text-green-950"
                }`}
                type="button"
                onClick={() => handleStatusSelection("Wanted")}
              >
                Wanted
              </button>
            </div>

            <div className="flex items-center mt-4">
              <span className="mr-4">Choose one:</span>
              <button
                className={`py-2 px-4 rounded-lg mx-2 ${
                  type === "Seeds"
                    ? "bg-green-950 text-white"
                    : "bg-white border border-green-950 text-green-950"
                }`}
                type="button"
                onClick={() => handleTypeSelection("Seeds")}
              >
                Seeds
              </button>
              <button
                className={`py-2 px-4 rounded-lg ${
                  type === "Produce"
                    ? "bg-green-950 text-white"
                    : "bg-white border border-green-950 text-green-950"
                }`}
                type="button"
                onClick={() => handleTypeSelection("Produce")}
              >
                Produce
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="postContent" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="postContent"
              rows="4"
              placeholder="Provide a description to allow others to find it more easily from a search"
              onChange={({ target }) => handleBodyInput(target.value)}
            ></textarea>
          </div>
          <div className="mb-3"></div>
        </form>
      </Modal.Body>
      <div className="flex justify-center mb-4">
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

        <button
          className="dropdown"
          onClick={() => handleCreate(user, item, status, type, image, body)}
        >
          Create Post
        </button>
      </div>
    </Modal>
  );
}

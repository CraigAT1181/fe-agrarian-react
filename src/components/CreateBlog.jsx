import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import {
  Modal,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from "react-bootstrap";
// import { createBlog } from "../api/api";

export default function CreateBlogModal({ show, handleClose, setNewBlog }) {
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

  const handleBodyInput = (value) => {
    setBody(value);
  };

//   const handleCreate = (user, item, status, type, image, body) => {
//     setIsLoading(true);

//     createPost(user.userID, status, type, item, image, body)
//       .then((data) => {
//         setIsLoading(false);
//         setNewPost(data);
//         handleClose();
//       })
//       .catch(() => {
//         setIsLoading(false);
//         setError(
//           "Ensure you've selected a Status and a Type (e.g. 'Wanted' 'Seeds')"
//         );
//       });
//   };

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
          <div className="mb-3 row">
            <div className="col text-center">
              <ToggleButtonGroup
                className="mx-3"
                type="radio"
                name="options">
                <ToggleButton
                //   variant={availableVariant}
                  id="Available"
                  onChange={() => handleStatusSelection("Available")}>
                  Available
                </ToggleButton>
                <ToggleButton
                //   variant={wantedVariant}
                  id="Wanted"
                  onChange={() => handleStatusSelection("Wanted")}>
                  Wanted
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="col text-center">
              <ToggleButtonGroup
                className="mx-3"
                type="radio"
                name="options">
                <ToggleButton
                  onChange={() => handleTypeSelection("Seeds")}
                //   variant={seedsVariant}
                  id="Seeds">
                  Seeds
                </ToggleButton>
                <ToggleButton
                  onChange={() => handleTypeSelection("Produce")}
                //   variant={produceVariant}
                  id="Produce">
                  Produce
                </ToggleButton>
              </ToggleButtonGroup>
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

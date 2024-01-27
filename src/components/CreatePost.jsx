import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import {
  Modal,
  Button,
  ToggleButtonGroup,
  ToggleButton,
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
      setType("Seed");
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
    createPost(user.userID, status, type, item, image, body).then((data) => {
      setNewPost(data);
      handleClose();
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
          <div className="mb-3 row">
            <div className="col text-center">
              <ToggleButtonGroup
                className="mx-3"
                type="radio"
                name="options">
                <ToggleButton
                  variant={availableVariant}
                  id="Available"
                  onChange={() => handleStatusSelection("Available")}>
                  Available
                </ToggleButton>
                <ToggleButton
                  variant={wantedVariant}
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
                  variant={seedsVariant}
                  id="Seeds">
                  Seeds
                </ToggleButton>
                <ToggleButton
                  onChange={() => handleTypeSelection("Produce")}
                  variant={produceVariant}
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

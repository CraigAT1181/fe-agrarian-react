import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Modal, Button, Alert, ListGroupItem } from "react-bootstrap";
import { createBlog } from "../api/api";

export default function CreateBlogModal({ show, handleClose, setNewBlog }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  let [imageURL, setImageURL] = useState("");

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

  // const handleImageURLInput = (value) => {
  //   setImageURL(value);
  // };

  const handleCreateBlog = () => {
    setIsLoading(true);

    createBlog(title, user.userID, content, tags, imageURL)
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        setNewBlog(data);
        handleClose();
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message: message });
        }
      );
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
          <div className="mb-3">
            <label
              htmlFor="blogImage"
              className="form-label">
              Image
            </label>
            <input
              type="text"
              className="form-control"
              id="blogImage"
            />
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

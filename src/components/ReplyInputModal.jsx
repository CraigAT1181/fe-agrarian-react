import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Modal, Button, Alert } from "react-bootstrap";
import { postComment } from "../api/api";
import "../App.css";

export default function ReplyInputModal({
  show,
  handleClose,
  blog_id,
  parent_comment_id,
  setReplyPosted,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [body, setBody] = useState("");
  const { user } = useAuth();
  const bodyRef = useRef(null);

  useEffect(() => {
    if (show && bodyRef.current) {
      bodyRef.current.focus();
    }
  }, [show]);

  const handleBodyInput = (value) => {
    setBody(value);
  };

  const handleSend = (blog_id, user_id, body, parent_comment_id) => {
    if (body.trim() !== "") {
      setIsLoading(true);

      postComment(blog_id, user_id, body, parent_comment_id)
        .then(() => {
          setIsLoading(false);
          setReplyPosted(true);
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
            setError({ status, message });
          }
        );
      setBody("");
      setReplyPosted(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Write your Reply</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label
              htmlFor="reply"
              className="form-label">
              {" "}
              //Include the parent_comment username Your reply
            </label>
            <textarea
              ref={bodyRef}
              className="form-control"
              id="reply"
              rows="10"
              onChange={({ target }) => handleBodyInput(target.value)}
            />
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
            <p>Posting your reply...</p>
          </div>
        )}
        <Button
          variant="secondary"
          onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={() =>
            handleSend(blog_id, user.userID, body, parent_comment_id)
          }>
          Finished
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

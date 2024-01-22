import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

export default function RequestLink() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  const requestHandler = () => {};

  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Password Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger">
            <div>{error}</div>
          </Alert>
        )}
        <form onSubmit={requestHandler}>
          <div className="form-group mt-2">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="text"
              className="form-control"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-success"
              type="submit">
              Send Link
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

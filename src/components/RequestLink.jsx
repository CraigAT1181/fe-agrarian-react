import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Alert } from "react-bootstrap";
import { requestLink } from "../api/api";

export default function RequestLink() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLinkSent(false);
  }, []);

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  const requestHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    requestLink(email)
      .then(() => {
        setIsLoading(false);
        setLinkSent(true);
        setError(null);
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setError(response.data.message);
      });
  };

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Sending your link...</p>
      </div>
    );

  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Password Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {linkSent && (
          <Alert variant="success">
            <div>A link has been sent to your e-mail.</div>
          </Alert>
        )}
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

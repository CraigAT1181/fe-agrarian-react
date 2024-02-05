import React, { useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { passwordRequest } from "../api/api";

export default function SetNewPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  const resetHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== retypePassword) {
      setError("Passwords do not match, please try again.");
    } else {
      setError(null);
      passwordRequest(newPassword, token)
        .then(({ message }) => {
            setIsLoading(false);
          setResetSuccess(message);
        })
        .catch(({ response }) => {
          setIsLoading(false);
          setError(response.data.message);
        });
    }
  };

  if (isLoading)
  return (
    <div className="d-flex-col text-center mt-4">
      <i className="fa-solid fa-spinner fa-spin"></i>
      <p>Setting your new password...</p>
    </div>
  );

  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Set New Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger">
            <div>{error}</div>
          </Alert>
        )}
        {resetSuccess && (
          <Alert variant="success">
            <div>{resetSuccess}</div>
            <Link to={"/login"}>
              <p>Login</p>
            </Link>
          </Alert>
        )}
        <form onSubmit={resetHandler}>
          <div className="form-group mt-2">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              className="form-control"
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
            />
            <label htmlFor="retypePassword">Re-type Password</label>
            <input
              id="retypePassword"
              type="password"
              className="form-control"
              value={retypePassword}
              onChange={({ target }) => setRetypePassword(target.value)}
            />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-success"
              type="submit">
              Confirm
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

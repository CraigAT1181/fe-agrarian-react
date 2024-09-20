import React, { useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { passwordRequest } from "../api/api";
import PasswordChecker from "./utilities/PasswordChecker";

export default function SetNewPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const togglePassword1Visibility = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  const resetHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== retypePassword) {
      setIsLoading(false);
      setError("Passwords don't match, please try again.");
    } else if (!password_pattern.test(newPassword)) {
      setIsLoading(false);
      setError("Password does not meet the required criteria.");
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
        {resetSuccess ? (
          <Alert variant="success">
            <div>{resetSuccess}</div>
            <Link to={"/login"}>
              <p>Login</p>
            </Link>
          </Alert>
        ) : (
          <form onSubmit={resetHandler}>
            <div className="form-group mt-2">
              <label htmlFor="password1">New Password</label>
              <div style={{ position: "relative" }}>
                <input
                  id="password1"
                  type={showPassword1 ? "text" : "password"}
                  className="form-control"
                  value={newPassword}
                  onChange={({ target }) => setNewPassword(target.value)}
                  style={{ paddingRight: "40px" }}
                />
                <button
                  className="text-success"
                  onClick={togglePassword1Visibility}
                  type="button"
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}>
                  <i
                    className={`fa-solid ${
                      showPassword1 ? "fa-eye" : "fa-eye-slash"
                    }`}></i>
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <label htmlFor="retypePassword">Re-type Password</label>
                <input
                  id="retypePassword"
                  type={showPassword2 ? "text" : "password"}
                  className="form-control"
                  value={retypePassword}
                  onChange={({ target }) => setRetypePassword(target.value)}
                  style={{ paddingRight: "40px" }}
                />
                <button
                  className="text-success"
                  onClick={togglePassword2Visibility}
                  type="button"
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "70%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}>
                  <i
                    className={`fa-solid ${
                      showPassword2 ? "fa-eye" : "fa-eye-slash"
                    }`}></i>
                </button>
              </div>
              <PasswordChecker password={newPassword} />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                className="btn btn-success"
                type="submit">
                Confirm
              </button>
            </div>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}

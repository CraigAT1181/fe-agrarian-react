import React, { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { passwordRequest } from "../api/api";
import PasswordChecker from "./utilities/PasswordChecker";

export default function SetNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [show, setShow] = useState(true);
  const [accessToken, setAccessToken] = useState(""); // To store the token

  const navigate = useNavigate();

  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const togglePassword1Visibility = (e) => {
    e.preventDefault();
    setShowPassword1(!showPassword1);
  };

  const togglePassword2Visibility = (e) => {
    e.preventDefault();
    setShowPassword2(!showPassword2);
  };

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  useEffect(() => {
    // Capture the token from the URL hash
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "")).get(
      "access_token"
    );

    if (token) {
      setAccessToken(token); // Store the token in state
    } else {
      console.error("No access token found");
      setError("Invalid or expired reset link.");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (newPassword !== retypePassword) {
      setError("Passwords don't match, please try again.");
      setIsLoading(false);
      return;
    } else if (!password_pattern.test(newPassword)) {
      setError("Password does not meet the required criteria.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await passwordRequest(accessToken, newPassword); // Pass the token
      if (data.message) {
        setResetSuccess(true);
        setMessage(data.message);
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError(
        "An error occurred while resetting your password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Setting your new password...</p>
      </div>
    );
  }

  return (
    <Modal show={show} onHide={handleClose}>
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
            <div>{message}</div>
            <Link to="/login">
              <p>Login</p>
            </Link>
          </Alert>
        ) : (
          accessToken && ( // Show form only if token exists
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-2">
                <label htmlFor="password1">New Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    id="password1"
                    type={showPassword1 ? "text" : "password"}
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    }}
                  >
                    <i
                      className={`fa-solid ${
                        showPassword1 ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </button>
                </div>

                <label htmlFor="retypePassword">Re-type Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    id="retypePassword"
                    type={showPassword2 ? "text" : "password"}
                    className="form-control"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    style={{ paddingRight: "40px" }}
                  />
                  <button
                    className="text-success"
                    onClick={togglePassword2Visibility}
                    type="button"
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <i
                      className={`fa-solid ${
                        showPassword2 ? "fa-eye" : "fa-eye-slash"
                      }`}
                    ></i>
                  </button>
                </div>
                <PasswordChecker password={newPassword} />
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-success" type="submit">
                  Confirm
                </button>
              </div>
            </form>
          )
        )}
      </Modal.Body>
    </Modal>
  );
}

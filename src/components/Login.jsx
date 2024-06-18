import React, { useState } from "react";
import { userLogin } from "../api/api";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal, Alert } from "react-bootstrap";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setShow(false);
    navigate(-1);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    userLogin(username, password)
      .then(({ access_token }) => {
        login(access_token);

        navigate("/");
      })
      .catch(() => {
        setIsLoading(false);
        setError("Invalid username or password.");
      });
  };

  if (isLoading)
    return (
      <div>
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Logging you in...</p>
      </div>
    );

  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger">
            <div>{error}</div>
            <div
              style={{
                fontSize: "13px",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/request-link");
              }}>
              Reset password.
            </div>
          </Alert>
        )}
        <form onSubmit={loginHandler}>
          <div className="form-group my-2">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: "40px" }}
            />
            <button
              className="text-green-950 cursor-pointer bg-transparent absolute top-8 right-2"
              onClick={togglePasswordVisibility}
              type="button"
>
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                }`}></i>
            </button>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="bg-green-950 text-white p-2 rounded-md"
              type="submit">
              Confirm
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

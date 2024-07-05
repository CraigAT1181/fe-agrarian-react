import React, { useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Modal, Alert } from "react-bootstrap";
import PasswordChecker from "./PasswordChecker";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(true);
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    postcode: "",
  });

  const navigate = useNavigate();

  const togglePassword1Visibility = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const registrationHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { username, password, email, postcode } = formData;
    if (formData.password !== retypePassword) {
      setIsLoading(false);
      setError("Passwords don't match, please try again.");
    } else {
      register(username, email, password, postcode)
        .then(({ message }) => {
          if (message === "New user registered.") {
            setIsLoading(false);
            navigate("/login");
          } else {
            setIsLoading(false);
            setError(message);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError({ message: error.message });
        });
    }
  };

  const handleClose = () => {
    setShow(false);
    navigate(-1);
  };

  if (isLoading)
    return (
      <div className="flex flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Just registering you, won't be long...</p>
      </div>
    );

  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={registrationHandler}>
          <div className="form-group mt-2">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleInput}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password1">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="password1"
                type={showPassword1 ? "text" : "password"}
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleInput}
                style={{ paddingRight: "40px" }}
              />
              <button
                className="text-green-900 cursor-pointer bg-transparent absolute top-2 right-2"
                onClick={togglePassword1Visibility}
                type="button">
                <i
                  className={`fa-solid ${
                    showPassword1 ? "fa-eye" : "fa-eye-slash"
                  }`}></i>
              </button>
            </div>
            <div className="form-group mt-2">
              <div style={{ position: "relative" }}>
                <label htmlFor="password2">Re-type Password</label>
                <input
                  id="password2"
                  type={showPassword2 ? "text" : "password"}
                  className="form-control"
                  name="retypePassword"
                  value={retypePassword}
                  onChange={({ target }) => setRetypePassword(target.value)}
                  style={{ paddingRight: "40px" }}
                />
                <button
                  className="text-green-900 cursor-pointer bg-transparent absolute top-8 right-2"
                  onClick={togglePassword2Visibility}
                  type="button">
                  <i
                    className={`fa-solid ${
                      showPassword2 ? "fa-eye" : "fa-eye-slash"
                    }`}></i>
                </button>
              </div>
            </div>
            <PasswordChecker password={formData.password} />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInput}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="postcode">Postcode</label>
            <input
              id="postcode"
              type="text"
              className="form-control"
              name="postcode"
              value={formData.postcode}
              onChange={handleInput}
            />
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

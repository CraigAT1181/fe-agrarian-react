import React, { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import PasswordChecker from "./utilities/PasswordChecker";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(true);
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_name: "",
    town: "",
    allotment: "",
    plot: "",
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

  const handleFileInput = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const registrationHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userData = new FormData();
    userData.append("email", formData.email);
    userData.append("password", formData.password);
    userData.append("user_name", formData.user_name);
    userData.append("town", formData.town);
    userData.append("allotment", formData.allotment);
    userData.append("plot", formData.plot);

    if (profilePic) {
      userData.append("profile_pic", profilePic);
    }

    if (formData.password !== retypePassword) {
      setIsLoading(false);
      setError("Passwords don't match, please try again.");
    } else {
      registerUser(userData)
        .then(({ user }) => {
          if (user) {
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={registrationHandler}>
          <div className="form-group mt-2">
            <label htmlFor="user_name">User Name</label>
            <input
              id="user_name"
              type="text"
              className="form-control"
              name="user_name"
              value={formData.user_name}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="town">Town / City</label>
            <input
              id="town"
              type="text"
              className="form-control"
              name="town"
              value={formData.town}
              onChange={handleInput}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="allotment">Allotment / Site</label>
            <input
              id="allotment"
              type="text"
              className="form-control"
              name="allotment"
              value={formData.allotment}
              onChange={handleInput}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="plot">Plot</label>
            <input
              id="plot"
              type="text"
              className="form-control"
              name="plot"
              value={formData.plot}
              onChange={handleInput}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="profile_pic">
              Profile Picture{" "}
              <span className="text-sm text-green-900">
                (.jpg, .jpeg or .png)
              </span>
            </label>
            <input
              id="profile_pic"
              type="file"
              className="form-control"
              name="profile_pic"
              onChange={handleFileInput}
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
                required
              />
              <button
                className="text-green-900 cursor-pointer bg-transparent absolute top-2 right-2"
                onClick={togglePassword1Visibility}
                type="button"
              >
                <i
                  className={`fa-solid ${
                    showPassword1 ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password2">Re-type Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="password2"
                type={showPassword2 ? "text" : "password"}
                className="form-control"
                name="retypePassword"
                value={retypePassword}
                onChange={({ target }) => setRetypePassword(target.value)}
                style={{ paddingRight: "40px" }}
                required
              />
              <button
                className="text-green-900 cursor-pointer bg-transparent absolute top-2 right-2"
                onClick={togglePassword2Visibility}
                type="button"
              >
                <i
                  className={`fa-solid ${
                    showPassword2 ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </button>
            </div>
          </div>
          <PasswordChecker password={formData.password} />
          <div className="flex justify-content-center mt-4">
            {error && (
              <p className="text-red-700">
                Registration failed, please try again.
              </p>
            )}
            <button className="confirm-button" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

import React, { useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Modal, Alert } from "react-bootstrap";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(true);
  const [formData, setformData] = useState({
    username: "",
    password: "",
    email: "",
    postcode: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setformData((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const registrationHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { username, password, email, postcode } = formData;

    register(username, email, password, postcode)
      .then(() => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        setError({ message: error.message });
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleInput}
            />
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
            <button className="btn btn-success" type="submit">
              Confirm
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>

    // <section className="container">
    //   <div className="d-flex justify-content-center">
    //     <form onSubmit={registrationHandler}>
    //       <div className="form-group">
    //         <label htmlFor="username">Username</label>
    //         <input
    //           id="username"
    //           type="text"
    //           className="form-control"
    //           onChange={({ target }) => setUsername(target.value)}
    //         />
    //       </div>
    //       <div className="form-group mt-2">
    //         <label htmlFor="password">Password</label>
    //         <input
    //           id="password"
    //           type="password"
    //           className="form-control"
    //           onChange={({ target }) => setPassword(target.value)}
    //         />
    //       </div>
    //       <div className="form-group mt-2">
    //         <label htmlFor="email">Email</label>
    //         <input
    //           id="email"
    //           type="text"
    //           className="form-control"
    //           onChange={({ target }) => setEmail(target.value)}
    //         />
    //       </div>
    //       <div className="form-group mt-2">
    //         <label htmlFor="postcode">Postcode</label>
    //         <input
    //           id="postcode"
    //           type="text"
    //           className="form-control"
    //           onChange={({ target }) => setPostcode(target.value)}
    //         />
    //       </div>
    //       <div className="d-flex justify-content-center mt-4">
    //         <button className="btn btn-success">
    //           {isLoading ? "Just a tick..." : "Sign Up"}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </section>
  );
}

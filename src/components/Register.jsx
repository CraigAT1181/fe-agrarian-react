import React, { useState } from "react";
import { register } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");

  const navigate = useNavigate("/");

  const registrationHandler = () => {
    setIsLoading(true);
    register(username, email, password, postcode)
      .then(() => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message: message });
        }
      );
  };

  return (
    <section className="container">
      <div className="d-flex justify-content-center">
        <form onSubmit={registrationHandler}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              className="form-control"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="postcode">Postcode</label>
            <input
              id="postcode"
              type="text"
              className="form-control"
              onChange={({ target }) => setPostcode(target.value)}
            />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-success">
              {isLoading ? "Just a tick..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
      {error && (
        <p>
          Error: {error.status} - {error.message}
        </p>
      )}
    </section>
  );
}

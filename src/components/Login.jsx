import React, { useState } from "react";
import { userLogin } from "../api/api";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    userLogin(username, password)
      .then((data) => {
        login(data);

        navigate("/");
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

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <section className="container">
      <div className="d-flex justify-content-center">
        <form onSubmit={loginHandler}>
          <div className="form-group mt-2">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-success"
              type="submit">
              Login
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

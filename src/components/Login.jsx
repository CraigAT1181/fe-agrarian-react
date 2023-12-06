import React, { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login({ setLoggedIn, setLoggedUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    setIsLoading(true);
    login(username, password)
      .then((data) => {
        setIsLoading(false);
        if (data) {
          setLoggedIn(true);
          setLoggedUser({
            user_id: data.user_id,
            user_name: data.user_name,
            email: data.email,
            postcode: data.postcode,
            produce: data.produce,
          });

          navigate("/");
        }
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
        <form>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={usernameHandler}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={passwordHandler}
          />

          <button
            type="button"
            onClick={loginHandler}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
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

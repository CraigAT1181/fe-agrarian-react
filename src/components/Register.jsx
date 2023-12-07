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

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const postcodeHandler = (e) => {
    setPostcode(e.target.value);
  };

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

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            onChange={emailHandler}
          />

          <label htmlFor="postcode">Postcode</label>
          <input
            id="postcode"
            type="text"
            onChange={postcodeHandler}
          />

          <button
            type="button"
            onClick={registrationHandler}>
            {isLoading ? "Just a tick..." : "Sign Up"}
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

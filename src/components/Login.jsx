import React, { useEffect, useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login({
  setLoggedIn,
  setLoggedUser,
  username,
  password,
  setUsername,
  setPassword,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    login(username, password)
      .then((data) => {
        console.log(data);
        setLoggedUser(data);
        setLoggedIn(true);
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/"); // Redirect to the home page or any other page after login
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

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setLoggedUser(foundUser);
      setLoggedIn(true);
    }
  }, []); // Run this effect only once on component mount

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
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <button type="submit">Login</button>
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

import React from "react";
import NavBar from "./NavBar";
import Profile from "./Profile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({
  loggedIn,
  loggedUser,
  setLoggedIn,
  setLoggedUser,
  setUsername,
  setPassword,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser, "found");
      setLoggedUser(foundUser);
      setLoggedIn(true);
    }
  }, []); // Run this effect only once on component mount

  return (
    <header className="d-flex justify-content-between align-items-center border-bottom border-success-subtle mb-5">
      <div className="p-2">
        {loggedIn ? (
          <Profile
            loggedUser={loggedUser}
            setLoggedIn={setLoggedIn}
            setLoggedUser={setLoggedUser}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        ) : (
          <div>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline-success m-2">
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-outline-success">
              Register
            </button>
          </div>
        )}
      </div>
      <NavBar />
      <div className="p-2">
        <h1 className="display-3 text-success">Agrarian</h1>
      </div>
    </header>
  );
}

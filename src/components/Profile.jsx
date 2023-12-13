import React, { useState, useEffect } from "react";
import { deleteUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile({
  loggedUser,
  setLoggedIn,
  setLoggedUser,
  setUsername,
  setPassword,
}) {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUser(loggedUser.user_id).then(() => {
      setLoggedIn(false);
      navigate("/");
    });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLoggedUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  };

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
    <>
      <div>
        <h3>Welcome back</h3>
        <h5>{loggedUser.user_name}</h5>
      </div>
      <div>
        <button
          className="btn btn-outline-success m-2"
          onClick={handleLogout}>
          Log Out
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            handleDelete();
          }}>
          Delete Account
        </button>
      </div>
    </>
  );
}

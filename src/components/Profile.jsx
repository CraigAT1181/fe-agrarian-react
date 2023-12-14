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
    const checkUserSession = () => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const { data, expiryTime } = JSON.parse(loggedInUser);
        const currentTime = new Date().getTime();

        if (currentTime < expiryTime) {
          setLoggedUser(data);
          setLoggedIn(true);
        } else {
          localStorage.removeItem("user");
        }
      }
    };

    checkUserSession();

    const intervalId = setInterval(() => {
      checkUserSession();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setLoggedIn, setLoggedUser]);

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

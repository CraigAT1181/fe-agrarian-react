import React, { useState } from "react";
import { deleteUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile({ loggedUser, setLoggedIn }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUser(loggedUser.user_id).then(() => {
      setLoggedIn(false);
      navigate("/");
    });
  };

  return (
    <>
      <div>
        <h3>Welcome back</h3>
        <h5>{loggedUser.user_name}</h5>
      </div>
      <div>
        <button
          className="btn btn-outline-success m-2"
          onClick={() => {
            setLoggedIn(false);
          }}>
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

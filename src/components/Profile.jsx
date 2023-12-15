import React from "react";
import { useAuth } from "./AuthContext";
import { deleteUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUser(user.user_id).then(() => {
      logout();
      localStorage.removeItem("user")
      navigate("/");
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div>
        <h3>Welcome back</h3>
        <h5>{user.user_name}</h5>
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

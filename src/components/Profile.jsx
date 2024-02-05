import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { deleteUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    setIsLoading(true);
    console.log(user.userID);
    deleteUser(user.userID)
      .then(() => {
        setIsLoading(false);
        logout();
        localStorage.removeItem("token");
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading) return <p>Just a moment...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <div className="container">
      <div className="text-center">
        <p className="text-white">{user.username}</p>
      </div>
      <div className="dropdown text-center">
        <Dropdown>
          <Dropdown.Toggle
            className="bg-success"
            id="dropdownMenuButton"
            style={{ border: "none" }}>
            <i className="fa-solid fa-user"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              className="text-success"
              onClick={() => navigate("/")}
              style={{ backgroundColor: "transparent" }}>
              Edit your produce
            </Dropdown.Item>

            <Dropdown.Item
              className="text-success"
              onClick={() => navigate("/exchange")}
              style={{ backgroundColor: "transparent" }}>
              Find other growers
            </Dropdown.Item>

            <Dropdown.Item
              className="text-success"
              onClick={() => navigate("/")}
              style={{ backgroundColor: "transparent" }}>
              View your posts
            </Dropdown.Item>

            <Dropdown.Item
              className="text-success"
              onClick={() => navigate("/messenger")}
              style={{ backgroundColor: "transparent" }}>
              View your messages
            </Dropdown.Item>

            <Dropdown.Item
              className="text-danger"
              onClick={handleLogout}>
              Logout
            </Dropdown.Item>
            <Dropdown.Item
              className="text-danger"
              onClick={handleDelete}>
              Delete Account
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

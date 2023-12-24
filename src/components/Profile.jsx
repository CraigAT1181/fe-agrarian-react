import React from "react";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { deleteUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUser(user.user_id).then(() => {
      logout();
      localStorage.removeItem("user");
      navigate("/");
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div
        className="container"
        style={{ width: "12rem" }}>
        <div className="dropdown text-center">
          <Dropdown>
            <Dropdown.Toggle
              className="bg-success"
              id="dropdownMenuButton">
              <i className="fa-solid fa-user"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="text-success"
                onClick={() => navigate("/")}
                style={{ backgroundColor: "transparent" }}>
                Home
              </Dropdown.Item>

              <Dropdown.Item
                className="text-success"
                onClick={() => navigate("/exchange")}
                style={{ backgroundColor: "transparent" }}>
                Exchange
              </Dropdown.Item>

              <Dropdown.Item
                className="text-success"
                onClick={() => navigate("/posts")}
                style={{ backgroundColor: "transparent" }}>
                Posts
              </Dropdown.Item>

              <Dropdown.Item
                className="text-success"
                onClick={() => navigate("/messenger")}
                style={{ backgroundColor: "transparent" }}>
                Messenger
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
    </>
  );
}

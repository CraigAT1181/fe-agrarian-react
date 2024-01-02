import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { deleteUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("user");
  }, []);

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
      <div className="container" style={{ width: "12rem" }}>
        <div className="text-center" style={{ width: "auto" }}>
          <p style={{ fontWeight: "bold", color: "white" }}>{user.user_name}</p>
        </div>
        <div className="dropdown text-center">
          <Dropdown>
            <Dropdown.Toggle
              className="bg-success"
              id="dropdownMenuButton"
              style={{ border: "none" }}
            >
              <i className="fa-solid fa-user"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                className="text-success"
                onClick={() => navigate("/")}
                style={{ backgroundColor: "transparent" }}
              >
                Edit your produce
              </Dropdown.Item>

              <Dropdown.Item
                className="text-success"
                onClick={() => navigate("/exchange")}
                style={{ backgroundColor: "transparent" }}
              >
                Find other growers
              </Dropdown.Item>

              <Dropdown.Item
                className="text-success"
                onClick={() => navigate("/posts")}
                style={{ backgroundColor: "transparent" }}
              >
                View your posts
              </Dropdown.Item>

              <Dropdown.Item
                className="text-success"
                onClick={() => navigate("/messenger")}
                style={{ backgroundColor: "transparent" }}
              >
                View your messages
              </Dropdown.Item>

              <Dropdown.Item className="text-danger" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={handleDelete}>
                Delete Account
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

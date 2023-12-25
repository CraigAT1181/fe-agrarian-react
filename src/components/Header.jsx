import React from "react";
import NavBar from "./NavBar";
import Profile from "./Profile";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      className="d-flex flex-md-row justify-content-between align-items-center border-bottom border-success-subtle mb-4"
      style={{ height: "8rem" }}
    >
      <h1 className="display-5 text-success m-4">Agrarian</h1>
      <NavBar />
      {user ? (
        <div>
          <Profile />
        </div>
      ) : (
        <div className="d-flex flex-column flex-md-row mx-4">
          <button
            onClick={() => navigate("/login")}
            className="btn btn-success m-2"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="btn btn-outline-success m-2"
          >
            Register
          </button>
        </div>
      )}
    </header>
  );
}

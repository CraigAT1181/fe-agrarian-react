import React from "react";
import NavBar from "./NavBar";
import Profile from "./Profile";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="d-flex flex-md-row justify-content-between align-items-center bg-success p-3 mb-4">
      <div className="text-white handwriting-font">
        <h2>The Cooking Pot</h2>
        <p>Health, Security, Community</p>
      </div>
      <NavBar />
      {user ? (
        <div>
          <Profile />
        </div>
      ) : (
        <div className="d-flex flex-md-row">
          <button
            onClick={() => navigate("/login")}
            className="btn bg-white text-success mx-1 fw-bold"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="btn bg-white text-success mx-1 fw-bold"
          >
            Register
          </button>
        </div>
      )}
    </header>
  );
}

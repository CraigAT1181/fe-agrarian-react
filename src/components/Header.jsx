import React from "react";
import NavBar from "./NavBar";
import Profile from "./Profile";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="d-flex justify-content-between align-items-center border-bottom border-success-subtle mb-3">
      <div className="p-2">
        {user ? (
          <Profile />
        ) : (
          <div>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline-success m-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-outline-success"
            >
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

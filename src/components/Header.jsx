import React from "react";
import NavBar from "./NavBar";
import Profile from "./Profile";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="d-flex flex-column flex-md-row justify-content-between align-items-center border-bottom border-success-subtle">

        <h1 className="display-3 text-success m-4">Agrarian</h1>

      <NavBar />
      <div className="p-2 m-4">
        {user ? (
          <Profile />
        ) : (
          <div className="d-flex flex-column flex-md-row">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline-success m-2">
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-outline-success m-2">
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

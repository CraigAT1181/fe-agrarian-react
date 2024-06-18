import React from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function LoginReg() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <div>
          <button
            className="login-reg-button"
            onClick={handleLogout}>
            Log out
          </button>
        </div>
      ) : (
        <div>
          <Link
            to="/login"
            className="login-reg-button">
            Login
          </Link>
          <Link
            to="/register"
            className="login-reg-button">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function LoginReg() {
  return (
    <div className="login-reg">
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
  );
}

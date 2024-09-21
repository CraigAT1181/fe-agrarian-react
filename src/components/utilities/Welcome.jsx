import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Welcome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      handleRedirect();
    }
  }, [user]);

  const handleRedirect = () => {
    console.log("user", user);
    navigate(`/allotments/${user.allotments.allotment_name}`);
  };

  return (
    <div>
      {!user && (
        <div className="text-center mt-10">
          <h1 className="font-semibold mb-4">Welcome!</h1>
          <p className="mb-6">Sign up or log in below...</p>
          <div className="flex justify-center">
            <button
              className="login-button-drawer"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="register-button-drawer"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

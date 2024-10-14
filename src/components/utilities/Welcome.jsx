import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Welcome() {
  const { user, toggleDrawer } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/allotments/${user.allotments.allotment_name}`);
    }
  }, [user, navigate]);

  return (
    <div className="text-center mt-10">
      {!user && (
        <p className="font-semibold">
          Login or register to join a local community of growers!
        </p>
      )}
    </div>
  );
}

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
      {
        "Insert a post display here of conversations taking place in a random allotment or town."
      }
    </div>
  );
}

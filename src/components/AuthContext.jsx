import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { updateUserProduce } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const authenticateUser = async () => {
      try {
        if (!user && storedToken) {
          const decodedToken = jwtDecode(storedToken);

          if (decodedToken.exp * 1000 > new Date().getTime()) {
            setUser({
              userID: decodedToken.user_id,
              username: decodedToken.sub,
              email: decodedToken.email,
              postcode: decodedToken.postcode,
              produce: decodedToken.produce,
            });
          } else {
            setUser(null);
            localStorage.removeItem("token");
            navigate("/");
          }
        }
      } catch {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    authenticateUser();
  }, [user, navigate]);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token);

      setUser({
        userID: decodedToken.user_id,
        username: decodedToken.sub,
        email: decodedToken.email,
        postcode: decodedToken.postcode,
        produce: decodedToken.produce,
      });

      localStorage.setItem("token", token);
    } catch {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const updateUserProduceData = async (newProduce) => {
    try {
      let updatedProduce = [];

      if (Array.isArray(newProduce)) {
        updatedProduce = [...new Set(newProduce)];
      } else {
        updatedProduce = [...new Set([...user.produce, newProduce])];
      }
      console.log(updatedProduce, "After the IF");
      const updatedUserData = await updateUserProduce(
        user.userID,
        updatedProduce
      );

      setUser((prevUser) => ({
        ...prevUser,
        produce: updatedUserData.produce,
      }));

      console.log("User produce updated successfully:", updatedProduce);
      console.log(updatedUserData, "updated user data");
    } catch (error) {
      console.error("Error updating user produce:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUserProduceData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used with an AuthProvider.");
  }

  return context;
};

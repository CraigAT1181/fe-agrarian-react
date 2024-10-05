import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser, logout } from "../../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authenticateUser();
        setUser(userData);
        if (!userData) {
          navigate("/");
        }
      } catch (error) {
        setUser(null);
        navigate("/");
        console.error("Failed to fetch user information", error);
      }
    };

    fetchUser();
  }, []);

  const login = (session, user) => {
    try {
      localStorage.setItem("token", session.access_token);
      setUser(user);
    } catch (error) {
      console.error("error", error);
      handleLogout();
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        handleLogout,
        isDrawerOpen,
        setDrawerOpen,
        toggleDrawer,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};

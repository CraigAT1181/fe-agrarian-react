import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const { user, expiryTime } = parsedUser;

      if (expiryTime && new Date().getTime() < expiryTime) {
        setUser(user);
      } else {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
      }
    }
  }, []);

  const login = (user) => {
    setUser(user);

    const expiryTime = new Date().getTime() + 60 * 60 * 1000;

    localStorage.setItem("user", JSON.stringify({ user, expiryTime }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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

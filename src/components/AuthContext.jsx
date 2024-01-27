import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const authenticateUser = async () => {
      try {
        if (storedToken) {
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
  }, [navigate]);

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

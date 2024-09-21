import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { updateUserProduce, authenticateUser, logout } from "../api/api";

// Create the AuthContext
const AuthContext = createContext();

// Provider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const [commentPosted, setCommentPosted] = useState(false);
  // const [messageSent, setMessageSent] = useState(false);
  // const [selectedConversation, setSelectedConversation] = useState(null);
  // const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authenticateUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
        navigate("/");
        console.error("Failed to fetch user information", error);
      }
    };

    fetchUser();

    // const authenticateUser = async () => {
    //   const storedToken = localStorage.getItem("token");

    //   try {
    //     if (storedToken) {
    //       const decodedToken = jwtDecode(storedToken);

    //       // Check if token is still valid
    //       if (decodedToken.exp * 1000 > new Date().getTime()) {
    //         setUser({
    //           userID: decodedToken.user_id,
    //           username: decodedToken.sub,
    //           email: decodedToken.email,
    //           postcode: decodedToken.postcode,
    //           produce: decodedToken.produce,
    //         });
    //       } else {
    //         // Handle expired token
    //         handleLogout();
    //       }
    //     }
    //   } catch (error) {
    //     // Handle token decode error
    //     handleLogout();
    //   }
    // };

    // authenticateUser();
  }, []); // Removed "navigate" as dependency

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

  // Update user produce data
  // const updateUserProduceData = async (newProduce) => {
  //   try {
  //     let updatedProduce;

  //     if (Array.isArray(newProduce)) {
  //       updatedProduce = [...new Set(newProduce)]; // Remove duplicates
  //     } else {
  //       updatedProduce = [...new Set([...user.produce, newProduce])]; // Add new produce and remove duplicates
  //     }

  //     const updatedUserData = await updateUserProduce(
  //       user.userID,
  //       updatedProduce
  //     );
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       produce: updatedUserData.produce,
  //     }));

  //     console.log("User produce updated successfully:", updatedProduce);
  //   } catch (error) {
  //     // Handle error during produce update
  //     console.error("Error updating user produce:", error);
  //   }
  // };

  // Manage new notfications
  // const addNotification = (message) => {
  //   setNotifications([...notifications, { message, read: false }]);
  // };

  // Handle read notifications
  // const markAsRead = (index) => {
  //   const newNotifications = [...notifications];
  //   newNotifications[index].read = true;
  //   setNotifications(newNotifications);
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        handleLogout,
        // updateUserProduceData,
        // commentPosted,
        // setCommentPosted,
        // selectedConversation,
        // setSelectedConversation,
        // messageSent,
        // setMessageSent,
        // notifications,
        // addNotification,
        // markAsRead
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  // updateUserProduce,
  fetchAllotmentPosts,
  fetchTownPosts,
  authenticateUser,
  logout,
  deletePost,
} from "../api/api";

// Create the AuthContext
const AuthContext = createContext();

// Provider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

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
        if (!userData) {
          navigate("/");
        }
      } catch (error) {
        setUser(null);
        navigate("/");
        console.error("Failed to fetch user information", error);
        setError(error);
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

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Fetch posts for the user's allotment
  const getAllotmentPosts = async (allotment_id) => {
    try {
      const { posts } = await fetchAllotmentPosts(allotment_id);
      setPosts(posts);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  // Fetch posts for the user's allotment
  const getTownPosts = async (town_id) => {
    try {
      const { posts } = await fetchTownPosts(town_id);
      setPosts(posts);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post_id !== postId)
    );
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
        isDrawerOpen,
        setDrawerOpen,
        toggleDrawer,
        posts,
        getAllotmentPosts,
        getTownPosts,
        handleDeletePost,
        handlePostClick,
        handleNewPost,
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

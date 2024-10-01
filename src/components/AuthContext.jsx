import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchTownPosts,
  authenticateUser,
  logout,
  deletePost,
  addPost,
  fetchSelectedPost,
} from "../api/api";

const AuthContext = createContext();

// Provider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);
  const [parentPost, setParentPost] = useState(null);
  const [replies, setReplies] = useState([]);

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

  const getTownPosts = async (town_id) => {
    try {
      const { posts } = await fetchTownPosts(town_id);
      setPosts(posts);
    } catch (error) {
      console.error("Failed to fetch posts", error);
      setError(error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const getSelectedPost = async (postId) => {
    try {
      const {
        data: { post, parentPost, replies },
      } = await fetchSelectedPost(postId);

      setSelectedPost(post);
      setParentPost(parentPost || null);
      setReplies(replies);
    } catch (error) {
      console.error("Failed to fetch selected post", error);
      setError(error);
    }
  };

  const handleNewPost = async (newPost, scope) => {
    try {
      if (scope === "allotment") {
        await addPost(newPost);
        await getAllotmentPosts(user.allotment_id);
      } else if (scope === "town") {
        console.log("NEW POST IN TOWN DETECTED!", scope);
        await addPost(newPost);
        await getTownPosts(user.town_id);
      }
    } catch (error) {
      console.error("Failed to add post", error);
      setError(error);
    }
  };

  const handleDeletePost = async (postId, scope) => {
    try {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.post_id !== postId)
      );
      await deletePost(postId);

      if (scope === "allotment") {
        await getAllotmentPosts(user.allotment_id);
      } else if (scope === "town") {
        await getTownPosts(user.town_id);
      }
    } catch (error) {
      console.error("Failed to delete post", error);
      setError(error);
    }
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
        error,
        setError,
        user,
        login,
        handleLogout,
        isDrawerOpen,
        setDrawerOpen,
        toggleDrawer,
        getTownPosts,
        handleDeletePost,
        handleNewPost,
        handlePostClick,
        getSelectedPost,
        selectedPost,
        parentPost,
        replies,
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

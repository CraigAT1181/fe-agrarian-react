import React, { createContext, useContext, useEffect, useState } from "react";
import { getNotifications } from "../../api/api";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchNotifications(user.user_id);
    }
  }, [user]);

  const fetchNotifications = async (userId) => {
    try {
      setIsLoading(true);
      const { data } = await getNotifications(userId);

      setNotifications(data);
      const unread = data.filter((notification) => !notification.is_read);

      setUnreadCount(unread.length);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching notifications in context.");
      setIsLoading(false);
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.associated_type === "post") {
      navigate(`/posts/${notification.associated_id}`);
    } else if (notification.associated_type === "message") {
      navigate(`/messages`);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        fetchNotifications,
        notifications,
        unreadCount,
        isLoading,
        handleNotificationClick,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

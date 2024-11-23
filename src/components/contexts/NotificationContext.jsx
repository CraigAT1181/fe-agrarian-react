import React, { createContext, useContext, useEffect, useState } from "react";
import { getNotifications, setNotificationRead } from "../../api/api";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [contextError, setContextError] = useState(null);

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
      console.error("Error fetching notifications in context:", error);
      setContextError(error);
      setIsLoading(false);
    }
  };

  const handleNotificationClick = async (notification) => {
    let isRead = notification.is_read;
    try {
      // isLoading(true);

      // Optimistic rendering
      const updatedNotifications = notifications.map((n) =>
        n.notification_id === notification.notification_id
          ? { ...n, is_read: true }
          : n
      );

      setNotifications(updatedNotifications);

      setUnreadCount((prevCount) =>
        notification.is_read ? prevCount : prevCount - 1
      );

      // Make request after optimistic rendering
      await setNotificationRead(notification.notification_id, isRead);
      fetchNotifications(user.user_id);
      // setIsLoading(false);
      if (notification.associated_type === "post") {
        navigate(`/posts/${notification.associated_id}`);
      } else if (notification.associated_type === "message") {
        navigate(`/messages`);
      }
    } catch (error) {
      console.error(
        "Error in handleNotificationClick context function:",
        error
      );
      setContextError(error);

      // Reverse optimistic rendering on fail
      const revertedNotifications = notifications.map((n) =>
        n.notification_id === notification.notification_id
          ? { ...n, is_read: notification.is_read }
          : n
      );
      setNotifications(revertedNotifications);

      setUnreadCount((prevCount) =>
        notification.is_read ? prevCount : prevCount + 1
      );

      // setIsLoading(false);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        contextError,
        handleNotificationClick,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

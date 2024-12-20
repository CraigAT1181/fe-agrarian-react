import React, { useEffect } from "react";
import { useNotification } from "../contexts/NotificationContext";
import NotificationCard from "./NotificationCard";

export default function NotificationDisplay() {
  const { notifications, handleNotificationClick, isLoading, contextError } =
    useNotification();

  console.log("notifications:", notifications);

  if (isLoading) return <div>Loading...</div>;
  if (contextError) return <div>{contextError}</div>;

  return (
    <div>
      {notifications &&
        (notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <NotificationCard
              key={index}
              notification={notification}
              handleNotificationClick={handleNotificationClick}
            />
          ))
        ) : (
          <p>Looks like you're all up to date!</p>
        ))}
    </div>
  );
}

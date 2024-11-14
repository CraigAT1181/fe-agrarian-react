import React, { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { setNotificationRead } from "../../api/api";

export default function NotificationCard({ notification }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const associatedData = notification.associated_data[0];

  const navigate = useNavigate();

  // ---------------- Format dates for rendering

  const formattedTime = notification.created_at
    ? formatDistanceToNow(new Date(notification.created_at), {
        addSuffix: true,
      })
    : "just now";

  function formatDate(dateString) {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return format(date, `EEEE, do 'of' MMMM yyyy 'at' h:mma`);
  }

  const formattedDate = formatDate(notification.created_at);

  // ----------------------------------------------

  const handleNotificationClick = async (associatedId) => {
    setIsLoading(true);
    const isRead = true;

    try {
      await setNotificationRead(notification.notification_id, isRead);
      navigate(`/posts/${associatedId}`);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <div
      onClick={() => handleNotificationClick(notification.associated_id)}
      className={`notification-card ${
        notification.is_read === false ? "font-bold" : "font-normal"
      }`}
    >
      <div className="flex items-center min-w-16 mx-2">
        <img
          className="w-16 h-16 object-cover rounded"
          src={associatedData.users.profile_pic}
          alt="User profile pic"
        />
      </div>
      <div className="flex-grow w-fit">
        <p className="pt-2 mb-1">{associatedData.content}</p>
        <p className="text-sm m-0">
          {formattedTime} <span className="font-thin">({formattedDate})</span>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";

export default function NotificationCard({
  notification,
  handleNotificationClick,
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const associatedData = notification.associated_data[0];

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

  const handleClick = async () => {
    setIsProcessing(true);
    await handleNotificationClick(notification);
    setIsProcessing(false);
  };

  return (
    <div
      onClick={!isProcessing ? handleClick : null}
      className={`notification-card ${
        notification.is_read ? "font-normal" : "font-bold"
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

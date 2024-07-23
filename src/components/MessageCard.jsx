import React from "react";
import { useAuth } from "./AuthContext";
import { format } from "date-fns";

const getInitials = (name) => {
  const nameArray = name.split(" ");
  const initials = nameArray.map((n) => n[0]).join("");
  return initials.toUpperCase();
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  return {
    dayOfWeek: format(date, `EEE`),
    day: `${day}`,
    suffix: <span>{suffix}</span>,
    month: format(date, `MMM`),
    year: format(date, `yy`),
    time: format(date, `h:mma`),
  };
};

export default function MessageCard({ message }) {
  const profile = getInitials(message.sender_name);
  const { user } = useAuth();

  const timeStamp = formatDate(message.created_at);
  const today = new Date();
  const messageDate = new Date(message.created_at);
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const messageDateOnly = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate()
  );

  return (
    <div className="message-card-container">
      {message.sender_id === user.userID ? (
        <div>
          <div className="flex p-2 items-center">
            <div className="bg-gray-400 rounded-full p-2 mr-2">
              <h2 className="m-0">{profile}</h2>
            </div>
            <div className="flex-grow">
              <div className="bg-gray-400 rounded p-2">{message.message}</div>
            </div>
          </div>
          {messageDateOnly.getTime() === todayDate.getTime() ? (
            <div className="text-end text-sm">{`${timeStamp.time}`}</div>
          ) : (
            <div className="text-end text-sm">{`${timeStamp.dayOfWeek}, ${timeStamp.day} ${timeStamp.month} '${timeStamp.year} at ${timeStamp.time}`}</div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex p-2 items-center">
            <div className="flex-grow">
              <div className="bg-gray-200 rounded p-2">{message.message}</div>
            </div>
            <div className="bg-gray-200 rounded-full p-2 ml-2">
              <h2 className="m-0">{profile}</h2>
            </div>
          </div>
          {messageDateOnly.getTime() === todayDate.getTime() ? (
            <div className="text-start text-sm">{`${timeStamp.time}`}</div>
          ) : (
            <div className="text-start text-sm">{`${timeStamp.dayOfWeek}, ${timeStamp.day} ${timeStamp.month} '${timeStamp.year} at ${timeStamp.time}`}</div>
          )}
        </div>
      )}
    </div>
  );
}

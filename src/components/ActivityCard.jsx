import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { format } from "date-fns";
import "../App.css";

function formatDate(dateString) {
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

  const formattedDate = format(date, `EEEE, do 'of' MMMM yyyy 'at' h:mma`);

  return {
    day: `${day}`,
    dayOfWeek: format(date, `EEEE`),
    fullDate: formattedDate,
    time: format(date, `h:mma`),
    month: format(date, `MMMM`),
    suffix: (
      <span style={{ fontSize: "16px", fontWeight: "normal" }}>{suffix}</span>
    ),
  };
}

export default function ActivityCard({ activity }) {
  const {
    activity_id,
    title,
    start,
    end,
    description,
    image_url,
    location,
    isCancelled,
    user_id,
    username,
    created,
    updated,
  } = activity;
  const formattedStart = formatDate(start);
  const formattedEnd = formatDate(end);
  const { user } = useAuth();

  const shortenDescription = (description) => {
    const maxLength = 200;
    return description.length > maxLength
      ? `${description.slice(0, maxLength)}...`
      : description;
  };

  const shortenedDescription = shortenDescription(description);

  const handleCancel = () => {
    setIsCancelled(!isCancelled);
  };

  return (
    <div className="container activity-card">
      <div className="row">
        <div className="col-md-2">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h1 className="m-0">
                {formattedStart.day}
                {formattedStart.suffix}
              </h1>
              <p>{formattedStart.dayOfWeek}</p>
              <hr />
              <p>
                {formattedStart.time} - {formattedEnd.time}
              </p>
              <hr />
              <p>{location}</p>
            </div>
          </div>
        </div>
        <div className="col p-3 mx-2">
          <div className="d-flex">
            <h4>{title}</h4>
            {user && user.userID === user_id && (
              <i
                className="fa-solid text-danger mx-3 fa-trash align-self-center pb-2"
                title={isCancelled ? "Un-cancel Activity" : "Cancel Activity"}
                style={{ cursor: "pointer" }}
                onClick={() => handleCancel()}></i>
            )}
          </div>
          <div className="container p-0 mt-3">
            {shortenedDescription}
            {isCancelled && (
              <p className="text-danger d-inline-block fw-bold border border-danger p-2 m-0">
                This event has been cancelled
              </p>
            )}
            {start < new Date() && (
              <div className="fw-bold text-danger">
                This activity has now finished.
              </div>
            )}
          </div>

          <div className="mt-5 fw-bold">
            <p>Organised by: {username}</p>
          </div>
        </div>
        <div className="col-auto">
          <Link to={`/activities/${activity_id}`}>
            {image_url ? (
              <img
                src={image_url}
                alt="Activity cover picture"
                style={{
                  borderRadius: "25px",
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <img
                style={{ borderRadius: "25px", width: "100%" }}
                src="https://picsum.photos/300/300"
                alt="Activity cover picture"
              />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

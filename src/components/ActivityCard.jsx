import React from "react";
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

export default function ActivityCard({
  title,
  start,
  end,
  description,
  image,
  location,
  username,
  created,
  updated,
}) {
  const formattedStart = formatDate(start);
  const formattedEnd = formatDate(end);

  const shortenDescription = (description) => {
    const maxLength = 200;
    return description.length > maxLength
      ? `${description.slice(0, maxLength)}...`
      : description;
  };

  const shortenedDescription = shortenDescription(description);

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
        <div className="col p-3">
          <div className="row">
            <h4>{title}</h4>
          </div>
          <div className="container p-0 mt-3">{shortenedDescription}</div>

          <div className="mt-5 fw-bold">
            <p>Organised by: {username}</p>
          </div>
        </div>
        <div className="col-auto">
          <img
            src={image}
            alt="Activity cover picture"
            style={{ borderRadius: "25px", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

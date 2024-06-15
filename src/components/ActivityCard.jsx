import React from "react";
import { Link } from "react-router-dom";
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
      <span>{suffix}</span>
    ),
  };
}

export default function ActivityCard({ activity, setCancelStatusChange }) {
  const {
    activity_id,
    title,
    start,
    end,
    description,
    image_url,
    location,
    is_cancelled,
    username,
    updated,
  } = activity;

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
    <div>
      <div>
        <div>
          <div>
            <div>
              <h1>
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
        <div>
          <div>
            <h4>{title}</h4>
          </div>
          <div>
            <div>{shortenedDescription}</div>
            {end < new Date() && !is_cancelled && (
              <p>
                This activity has now finished.
              </p>
            )}
            {is_cancelled &&
              (end < new Date() ? (
                <p>
                  This event was cancelled
                </p>
              ) : (
                <p>
                  This event has been cancelled
                </p>
              ))}
          </div>

          <div>
            <p>Organised by: {username}</p>
          </div>
        </div>
        <div>
          <Link to={`/activities/${activity_id}`}>
            {image_url ? (
              <img
                src={image_url}
                alt="Activity cover picture"
              />
            ) : (
              <img
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

import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

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
    suffix: <span>{suffix}</span>,
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
    <div className="activity-card">
      <div className="p-2">
        <p className="my-0">{formattedStart.dayOfWeek}</p>
        <h1 className="mb-4">
          {formattedStart.day}
          {formattedStart.suffix}
        </h1>

        <p>
          {formattedStart.time} - {formattedEnd.time}
        </p>

        <p>{location}</p>
        <h2>{title}</h2>
      </div>

      <div>
        <Link to={`/activities/${activity_id}`}>
          {image_url ? (
            <img
              src={image_url}
              alt="Activity cover picture"
              className="activity-card-image"
            />
          ) : (
            <img
              src="https://picsum.photos/300/300"
              alt="Activity cover picture"
              className="activity-card-image"
            />
          )}
        </Link>
      </div>
      <div className="p-2">
        <div>{shortenedDescription}</div>
        <div className="my-2 font-semibold">
          <p>Organised by: {username}</p>
        </div>
        <div className="bg-gray-600 p-1 text-white">
          {end < new Date() && !is_cancelled && (
            <p className="my-0">This activity has now finished.</p>
          )}
          {is_cancelled &&
            (end < new Date() ? (
              <p className="my-0">This event was cancelled</p>
            ) : (
              <p className="my-0">This event has been cancelled</p>
            ))}
        </div>
      </div>
    </div>
  );
}

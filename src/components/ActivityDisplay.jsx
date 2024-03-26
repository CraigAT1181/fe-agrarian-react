import React, { useState, useEffect } from "react";
import ActivityCard from "./ActivityCard";

// Component to fetch activity objects from the backend API
export default function ActivityDisplay({ activities }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update current date at midnight
    const midnightUpdate = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60); // Check every hour

    // Clean up interval
    return () => clearInterval(midnightUpdate);
  }, []);

  // Get current month and year
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  // Generate months of the year array, starting with the current month
  const monthsOfYear = Array.from({ length: 12 }, (_, index) => {
    const month = (currentDate.getMonth() + index) % 12;
    const year =
      currentYear + Math.floor((currentDate.getMonth() + index) / 12);
    return `${new Date(year, month).toLocaleString("default", {
      month: "long",
    })} ${year}`;
  });

// Group activities by month and year
const groupedActivities = activities.reduce((acc, activity) => {
  const startDate = new Date(activity.date_s_time);
  const endDate = new Date(activity.date_e_time);
  const monthYearString = `${startDate.toLocaleString("default", {
    month: "long",
  })} ${startDate.getFullYear()}`;
  if (!acc[monthYearString]) {
    acc[monthYearString] = [];
  }
  acc[monthYearString].push({ ...activity, start: startDate, end: endDate });
  return acc;
}, {});

  return (
    <div>
      {/* Render banners and their associated activities */}
      {monthsOfYear.map((monthYearString) => (
        <div key={monthYearString}>
          <Banner monthYear={monthYearString} />
          <ul>
            {groupedActivities[monthYearString]?.map((activity) => (<>
            {console.log(activity)}
              <ActivityCard
                key={activity.activity_id}
                title={activity.title}
                start={activity.start}
                end={activity.end}
                description={activity.description}
                image={activity.image_url}
                location={activity.location}
                username={activity.username}
                created={activity.created_at}
                updated={activity.updated_at}
              /></>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Component for the banner to display the month and year
const Banner = ({ monthYear }) => {
  return (
    <div className="banner">
      <div className="row align-items-center">
        <div className="col-auto">
          <h5 className="m-0">{monthYear}</h5>
        </div>
        <div className="col">
          <hr />
        </div>
      </div>
    </div>
  );
};

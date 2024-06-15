import React, { useState, useEffect } from "react";
import ActivityCard from "./ActivityCard";
import Banner from "./Banner";

export default function ActivityDisplay({
  activities,
  searchedActivities,
  selectedDate,
  setCancelStatusChange,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const midnightUpdate = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60);

    return () => clearInterval(midnightUpdate);
  }, [searchedActivities, selectedDate]);

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const monthsOfYear = Array.from({ length: 14 }, (_, index) => {
    const month = (currentDate.getMonth() - 1 + index) % 12;
    const year =
      currentYear + Math.floor((currentDate.getMonth() + index - 1) / 12);
    return `${new Date(year, month).toLocaleString("default", {
      month: "long",
    })} ${year}`;
  });

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

  const groupedSearchedActivities = searchedActivities.reduce(
    (acc, activity) => {
      const startDate = new Date(activity.date_s_time);
      const endDate = new Date(activity.date_e_time);
      const monthYearString = `${startDate.toLocaleString("default", {
        month: "long",
      })} ${startDate.getFullYear()}`;
      if (!acc[monthYearString]) {
        acc[monthYearString] = [];
      }
      acc[monthYearString].push({
        ...activity,
        start: startDate,
        end: endDate,
      });
      return acc;
    },
    {}
  );

  // Function to filter activities based on selected date
  const filterActivities = (activities) => {
    return activities.filter((activity) => {
      const activityDate = new Date(activity.date_s_time);
      return activityDate.toDateString() === selectedDate.toDateString();
    });
  };

  return (
    <div>
      {selectedDate && (
        <div>
          {monthsOfYear.map((monthYearString) => (
            <div key={monthYearString}>
              <Banner monthYear={monthYearString} />
              <ul>
                {filterActivities(groupedActivities[monthYearString] || []).map(
                  (activity) => (
                    <ActivityCard
                      key={activity.activity_id}
                      activity={activity}
                      setCancelStatusChange={setCancelStatusChange}
                    />
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      )}

      {!selectedDate && (
        <div>
          {monthsOfYear.map((monthYearString) => (
            <div key={monthYearString}>
              <Banner monthYear={monthYearString} />
              <ul>
                {(searchedActivities.length > 0
                  ? groupedSearchedActivities[monthYearString] ?? []
                  : groupedActivities[monthYearString] ?? []
                ).map((activity) => (
                  <ActivityCard
                    key={activity.activity_id}
                    activity={activity}
                    setCancelStatusChange={setCancelStatusChange}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

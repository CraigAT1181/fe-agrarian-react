import React, { useState, useEffect } from "react";
import ActivityCard from "./ActivityCard";
import Banner from "./Banner";

// ActivityDisplay component: displays activities based on the selected date or search results
export default function ActivityDisplay({
  activities,
  searchedActivities,
  selectedDate,
  setCancelStatusChange,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update the current date at midnight every day
  useEffect(() => {
    const midnightUpdate = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60);

    return () => clearInterval(midnightUpdate);
  }, [searchedActivities, selectedDate]);

  // Format current year
  const currentYear = currentDate.getFullYear();

  // Generate month/year strings for display
  const monthsOfYear = Array.from({ length: 14 }, (_, index) => {
    const month = (currentDate.getMonth() - 1 + index) % 12;
    const year =
      currentYear + Math.floor((currentDate.getMonth() + index - 1) / 12);
    return `${new Date(year, month).toLocaleString("default", {
      month: "long",
    })} ${year}`;
  });

  // Group activities by their month and year
  const groupActivitiesByMonthYear = (activities) => {
    return activities.reduce((acc, activity) => {
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
  };

  const groupedActivities = groupActivitiesByMonthYear(activities);
  const groupedSearchedActivities = groupActivitiesByMonthYear(searchedActivities);

  // Filter activities based on the selected date
  const filterActivitiesByDate = (activities) => {
    return activities.filter((activity) => {
      const activityDate = new Date(activity.date_s_time);
      return activityDate.toDateString() === selectedDate.toDateString();
    });
  };

  return (
    <div>
      {selectedDate ? (
        <div>
          {monthsOfYear.map((monthYearString) => (
            <div key={monthYearString}>
              <Banner monthYear={monthYearString} />
              <div className="activities-display">
                {filterActivitiesByDate(groupedActivities[monthYearString] || []).map(
                  (activity) => (
                    <ActivityCard
                      key={activity.activity_id}
                      activity={activity}
                      setCancelStatusChange={setCancelStatusChange}
                    />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="my-4">
          {monthsOfYear.map((monthYearString) => (
            <div key={monthYearString}>
              <Banner monthYear={monthYearString} />
              <div className="activities-display">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

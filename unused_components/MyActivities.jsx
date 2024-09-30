import React, { useState, useEffect } from "react";
import { getActivities } from "../api/api";
import ActivityCard from "./ActivityCard";
import CreateActivityModal from "./CreateActivity";
import Banner from "./Banner";
import { useAuth } from "./AuthContext";

// MyActivities component: fetches and displays activities created by the logged-in user
export default function MyActivities() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userActivities, setUserActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cancelStatusChange, setCancelStatusChange] = useState(false);
  const [newActivity, setNewActivity] = useState(null);

  const { user } = useAuth();

  // Update the current date at midnight every day
  useEffect(() => {
    const midnightUpdate = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60);

    return () => clearInterval(midnightUpdate);
  }, []);

  // Fetch user-specific activities from the backend and sort by start date
  useEffect(() => {
    setIsLoading(true);
    getActivities()
      .then(({ activities }) => {
        const sortedActivities = activities
          .filter((activity) => activity.user_id === user.userID)
          .sort((a, b) => new Date(a.date_s_time) - new Date(b.date_s_time));
        setUserActivities(sortedActivities);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
    setCancelStatusChange(false);
  }, [user.userID, cancelStatusChange, newActivity]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Generate month/year strings for display
  const currentYear = currentDate.getFullYear();
  const monthsOfYear = Array.from({ length: 14 }, (_, index) => {
    const month = (currentDate.getMonth() - 1 + index) % 12;
    const year = currentYear + Math.floor((currentDate.getMonth() + index - 1) / 12);
    return `${new Date(year, month).toLocaleString("default", { month: "long" })} ${year}`;
  });

  // Group activities by their month and year
  const groupedActivities = userActivities.reduce((acc, activity) => {
    const startDate = new Date(activity.date_s_time);
    const endDate = new Date(activity.date_e_time);
    const monthYearString = `${startDate.toLocaleString("default", { month: "long" })} ${startDate.getFullYear()}`;
    if (!acc[monthYearString]) {
      acc[monthYearString] = [];
    }
    acc[monthYearString].push({ ...activity, start: startDate, end: endDate });
    return acc;
  }, {});

  // Loading and error handling
  if (isLoading) {
    return (
      <div className="flex flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading your activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col text-center mt-4">
        <i className="fa-solid fa-exclamation"></i>
        <p>Oops, there's been an error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="my-activities-container">
      <div>
        <button className="dropdown" type="button" onClick={handleShow}>
          New Activity
        </button>
        <CreateActivityModal
          show={showModal}
          handleClose={handleClose}
          setNewActivity={setNewActivity}
        />
      </div>
      {userActivities.length > 0 ? (
        <div className="my-4">
          {monthsOfYear.map((monthYearString) => (
            <div key={monthYearString}>
              {groupedActivities[monthYearString] && (
                <Banner monthYear={monthYearString} />
              )}
              <div className="my-activities-display">
                {groupedActivities[monthYearString]?.map((activity) => (
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
      ) : (
        <div className="flex justify-center my-4">
          <span>You haven't arranged any activities yet.</span>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { getActivities } from "../api/api";
import ActivityCard from "./ActivityCard";
import CreateActivityModal from "./CreateActivity";
import Banner from "./Banner";
import { useAuth } from "./AuthContext";

export default function MyActivities() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userActivities, setUserActivities] = useState([]);
  const [searchedActivities, setSearchedActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cancelStatusChange, setCancelStatusChange] = useState(false);
  let [newActivity, setNewActivity] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    const midnightUpdate = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60);

    return () => clearInterval(midnightUpdate);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getActivities()
      .then(({ activities }) => {
        setIsLoading(false);

        const sortedActivities = activities
          .filter((activity) => activity.user_id === user.userID)
          .sort((a, b) => new Date(a.date_s_time) - new Date(b.date_s_time));

        setUserActivities(sortedActivities);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
    setCancelStatusChange(false);
  }, [user.userID, cancelStatusChange, newActivity]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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

  const groupedActivities = userActivities.reduce((acc, activity) => {
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

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading your activities...</p>
      </div>
    );

  if (error)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <div>
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
      <div className="my-activities-container">
        {monthsOfYear.map((monthYearString) => (
          <div key={monthYearString}>
            {groupedActivities[monthYearString] && (
              <Banner monthYear={monthYearString} />
            )}
            <div className="activities-display">
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
    </div>
  );
}

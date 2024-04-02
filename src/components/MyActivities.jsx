import React, { useEffect, useState } from "react";
import { getActivitiesByUserID } from "../api/api";
import { useAuth } from "./AuthContext";
import CreateActivityModal from "./CreateActivity";
import ActivityCard from "./ActivityCard";

export default function MyActivities() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userActivities, setUserActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let [newActivity, setNewActivity] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getActivitiesByUserID(user.userID)
      .then(({ activities }) => {
        setIsLoading(false);
        const updatedActivities = activities.map((activity) => ({
          ...activity,
          start: new Date(activity.date_s_time),
          end: activity.date_e_time,
        }));
        setUserActivities(updatedActivities);
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message: message });
        }
      );
  }, [newActivity]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading your blogs...</p>
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
    <div className="container box-border p-4 mt-3">
      <div className="d-flex justify-content-between">
        <h5>Your activities:</h5>
        <button className="btn btn-success" type="button" onClick={handleShow}>
          Create an activity
        </button>
        <CreateActivityModal
          show={showModal}
          handleClose={handleClose}
          setNewActivity={setNewActivity}
        />
      </div>

      <div className="d-flex" style={{ overflowX: "auto" }}>
        {userActivities && userActivities.length > 0 ? (
          userActivities.map((activity) => (
            <div
              key={activity.activity_id}
              className="my-2 mx-2"
              style={{ width: "25%", marginRight: "2rem", flexShrink: 0 }}
            >
              <ActivityCard activity={activity} />
            </div>
          ))
        ) : (
          <div className="d-flex align-items-center justify-content-center">
            <p>You've not arranged any activities.</p>
          </div>
        )}
      </div>
    </div>
  );
}

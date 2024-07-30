import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { format } from "date-fns";
import { getActivityByActivityID, cancelActivity } from "../api/api";
import EditActivityModal from "./EditActivity";
import MessageButton from "./MessageButton";

// Utility function to format dates with suffixes and other details
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();

  // Determine the suffix for the day
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  // Format the date
  const formattedDate = format(date, `EEEE, do 'of' MMMM yyyy`);

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

// ActivityDetail component: displays details of a single activity
export default function ActivityDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [singleActivity, setSingleActivity] = useState({});
  const [editedActivity, setEditedActivity] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const { activity_id } = useParams();

  // Fetch the activity details and format dates when component mounts or editedActivity changes
  useEffect(() => {
    setIsLoading(true);

    const fetchActivity = async () => {
      try {
        const activity = await getActivityByActivityID(activity_id);

        // Set default image if none is provided
        if (!activity.image_url) {
          activity.image_url = "https://picsum.photos/300/300";
        }

        // Format start and end dates
        const formattedStart = formatDate(activity.date_s_time);
        const formattedEnd = formatDate(activity.date_e_time);
        setSingleActivity({
          ...activity,
          formattedStart,
          formattedEnd,
        });

        setIsLoading(false);
      } catch (error) {
        const {
          response: {
            status,
            data: { message },
          },
        } = error;
        setIsLoading(false);
        setError({ status, message });
      }
    };

    fetchActivity();
    setEditedActivity(false);
  }, [activity_id, editedActivity]);

  // Handle activity cancellation or restoration
  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await cancelActivity(activity_id, singleActivity.is_cancelled);
      setIsLoading(false);
      setEditedActivity(true);
    } catch (error) {
      setIsLoading(false);
      setError({ message: error.message });
    }
  };

  // Show the edit activity modal
  const handleShow = () => setShowModal(true);

  // Close the edit activity modal
  const handleClose = () => setShowModal(false);

  // Display error message if an error occurs
  if (error) {
    return (
      <div className="error-container">
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="activity-detail-container">
      <div className="flex flex-col text-center">
        <div className="flex justify-center">
          <img
            className="w-full lg:w-1/2 object-cover mb-4"
            src={singleActivity.image_url}
            alt="Activity Image"
          />
        </div>
        {isLoading ? (
          <div>
            <i className="fa-solid fa-spinner fa-spin"></i>
          </div>
        ) : (
          <div>
            <p>{singleActivity.formattedStart.fullDate}</p>
            <p>{`${singleActivity.formattedStart.time} - ${singleActivity.formattedEnd.time}`}</p>
          </div>
        )}

        <p>{singleActivity.location}</p>

        {singleActivity.updated_at !== singleActivity.created_at && (
          <p>{singleActivity.updated_at}</p>
        )}

        <h1>{singleActivity.title}</h1>

        <div>
          {singleActivity.description &&
            singleActivity.description
              .split("\n")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>

        <div className="mb-2">
          {singleActivity.is_cancelled &&
            user?.userID !== singleActivity.user_id && (
              <span className="bg-gray-600 text-white p-1 rounded">
                {new Date(singleActivity.date_e_time) < new Date()
                  ? "This activity was cancelled."
                  : "This activity has been cancelled."}
              </span>
            )}
        </div>

        <div className="flex justify-center">
          {user &&
            user.userID !== singleActivity.user_id &&
            new Date(singleActivity.date_e_time) < new Date() &&
            !singleActivity.is_cancelled && (
              <div className="w-fit">
                <p className="bg-gray-600 text-white p-2 rounded">
                  This activity has now finished.
                </p>
                <p>
                  Contact{" "}
                  <span className="font-semibold">
                    {singleActivity.username}
                  </span>{" "}
                  for more information
                </p>
              </div>
            )}
        </div>

        {user && user.userID === singleActivity.user_id && (
          <div>
            <button
              className="dropdown"
              onClick={handleShow}>
              Edit
            </button>
            <EditActivityModal
              show={showModal}
              handleClose={handleClose}
              singleActivity={singleActivity}
              setEditedActivity={setEditedActivity}
            />
            <button
              className="dropdown"
              onClick={handleCancel}>
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : singleActivity.is_cancelled ? (
                "Reverse Cancellation"
              ) : (
                "Cancel Activity"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

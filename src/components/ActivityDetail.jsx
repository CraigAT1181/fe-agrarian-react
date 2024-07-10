import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { format } from "date-fns";
import { getActivityByActivityID } from "../api/api";
import MessageButtonL from "./MessageButtonL";
import EditActivityModal from "./EditActivity";
import { cancelActivity } from "../api/api";
import { Alert } from "react-bootstrap";

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

export default function ActivityDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [singleActivity, setSingleActivity] = useState({});
  let [editedActivity, setEditedActivity] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const { activity_id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getActivityByActivityID(activity_id)
      .then((activity) => {
        setIsLoading(false);

        if (activity.image_url === "" || activity.image_url === null) {
          setSingleActivity({
            ...activity,
            image_url: "https://picsum.photos/300/300",
          });
        }

        const formattedStart = formatDate(activity.date_s_time);
        activity = { ...activity, formattedStart };

        const formattedEnd = formatDate(activity.date_e_time);
        activity = { ...activity, formattedEnd };

        setSingleActivity(activity);
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
    setEditedActivity(false);
  }, [editedActivity]);

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const data = await cancelActivity(
        activity_id,
        singleActivity.is_cancelled
      );
      setIsLoading(false);

      setEditedActivity(true);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  if (error)
    return (
      <div>
        <i className="fa-solid fa-exclamation"></i>
        <p>
          Oops, there's been an error: {error.status} {error.message}
        </p>
      </div>
    );

  return (
    <div className="activity-detail-container">
      <div className="flex flex-col text-center">
        <img
          className="w-full object-cover mb-4"
          src={singleActivity.image_url}
          alt="Activity Image"
        />

        {isLoading ? (
          <div>
            <i className="fa-solid fa-spinner fa-spin"></i>
          </div>
        ) : (
          <div>
            <p>{`${singleActivity.formattedStart.fullDate}`}</p>
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
              .split("/n")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
        <div>
          <div className="mb-2">
            {singleActivity.is_cancelled &&
              user?.userID !== singleActivity.user_id &&
              (new Date(singleActivity.date_e_time) < new Date() ? (
                <span className="bg-gray-600 text-white p-1 rounded">
                  This activity was cancelled.
                </span>
              ) : (
                <span className="bg-gray-600 text-white p-1 rounded">
                  This activity has been cancelled.
                </span>
              ))}
          </div>
          <div>
            {user ? (
              user.userID !== singleActivity.user_id &&
              (new Date(singleActivity.date_e_time) < new Date() &&
              !singleActivity.is_cancelled ? (
                <span>This activity has now finished.</span>
              ) : (
                <span>
                  If you'd like to find out more about this activity, contact{" "}
                  {singleActivity.username}
                </span>
              ))
            ) : new Date(singleActivity.date_e_time) < new Date() &&
              !singleActivity.is_cancelled ? (
              <span>This activity has now finished.</span>
            ) : (
              <span>
                If you'd like to find out more about this activity, contact{" "}
                {singleActivity.username}
              </span>
            )}
          </div>

          {user && user.userID === singleActivity.user_id && (
            <div>
              <button className="dropdown" onClick={handleShow}>
                Edit
              </button>
              <EditActivityModal
                show={showModal}
                handleClose={handleClose}
                singleActivity={singleActivity}
                setEditedActivity={setEditedActivity}
              />
              <button className="dropdown" onClick={handleCancel}>
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
    </div>
  );
}

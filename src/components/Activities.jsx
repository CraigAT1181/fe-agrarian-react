import React, { useState, useEffect } from "react";
import { getActivities } from "../api/api";
import ActivityDisplay from "./ActivityDisplay";

export default function Activities() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getActivities()
      .then(({ activities }) => {
        setIsLoading(false);
        setActivities(activities);
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
  }, []);

  return (
    <div className="container">
      <ActivityDisplay activities={activities}/>
    </div>
  );
}

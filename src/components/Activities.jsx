import React, { useState, useEffect } from "react";
import { getActivities } from "../api/api";
import ActivityDisplay from "./ActivityDisplay";
import MyDatePicker from "./DatePicker";
import SearchBar from "./SearchBar";
import "../App.css";

export default function Activities() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const [searchedActivities, setSearchedActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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
  }, [setSearchedActivities]);

  if (isLoading)
    return (
      <div className="d-flex-col text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading activities...</p>
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
    <div className="container">
      <div className="d-flex row">
        <div className="col p-4">
          <MyDatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="col p-4">
          <SearchBar
            activities={activities}
            setSearchedActivities={setSearchedActivities}
          />
        </div>
      </div>

      <div className="p-2">
        <ActivityDisplay
          activities={activities}
          searchedActivities={searchedActivities}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}

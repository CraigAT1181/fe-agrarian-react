import React, { useState, useEffect } from "react";
import { getActivities } from "../api/api";
import ActivityDisplay from "./ActivityDisplay";
import MyDatePicker from "./DatePicker";
import SearchBar from "./SearchBar";

export default function Activities() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const [searchedActivities, setSearchedActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cancelStatusChange, setCancelStatusChange] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getActivities()
      .then(({ activities }) => {
        setIsLoading(false);
        const sortedActivities = activities
        .sort((a, b) => new Date(a.date_s_time) - new Date(b.date_s_time));

      setActivities(sortedActivities);
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
    setCancelStatusChange(false);
  }, [setSearchedActivities, cancelStatusChange]);

  if (isLoading)
    return (
      <div>
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Loading activities...</p>
      </div>
    );
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
    <div className="flex-col text-center my-4">
      <div>
        <div className="flex justify-center">
          <MyDatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="flex justify-center">
          <SearchBar
            activities={activities}
            setSearchedActivities={setSearchedActivities}
          />
        </div>
      </div>

      <div>
        <ActivityDisplay
          activities={activities}
          searchedActivities={searchedActivities}
          selectedDate={selectedDate}
          setCancelStatusChange={setCancelStatusChange}
        />
      </div>
    </div>
  );
}

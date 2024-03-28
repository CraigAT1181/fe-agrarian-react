import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

export default function MyDatePicker({ selectedDate, setSelectedDate }) {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h5>Activities by date:</h5>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="d MMMM, yyyy"
        placeholderText="Select a date"
        className="date-picker"
        isClearable
      />
    </div>
  );
}

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

export default function MyDatePicker({ selectedDate, setSelectedDate }) {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="d MMMM, yyyy"
        placeholderText="Click to search by date"
        className="date-picker"
        isClearable
      />
    </div>
  );
}

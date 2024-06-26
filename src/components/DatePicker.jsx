import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyDatePicker({ selectedDate, setSelectedDate }) {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="border w-fit p-1 rounded shadow-md">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="d MMMM, yyyy"
        placeholderText="Click to search by date"
        className="date-picker text-center"
        isClearable
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "../App.css";

export default function SearchBar({ activities, setSearchedActivities }) {
  const [searchTerms, setSearchTerms] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {}, [notFound]);

  const handleInputChange = (e) => {
    setSearchTerms(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const searchTerm = searchTerms.toLocaleLowerCase();

    if (activities) {
      const filteredActivities = activities.filter((activity) => {
        const searchTermsArray = searchTerm.split(" ");

        return (
          searchTermsArray.some((searchWord) =>
            activity.title.toLowerCase().includes(searchWord)
          ) ||
          searchTermsArray.some((searchWord) =>
            activity.description.toLowerCase().includes(searchWord)
          ) ||
          searchTermsArray.some((searchWord) =>
            activity.username.toLowerCase().includes(searchWord)
          )
        );
      });

      setSearchedActivities(filteredActivities);
      if (filteredActivities.length === 0) {
        setNotFound(true);
        setSearchTerms("");
      }
    }
  };

  return (
    <div className="search-bar-container">
      <form
        className="my-3"
        onSubmit={(e) => handleSearch(e)}>
        <div className="input-group">
          <span className="input-group-text">
            <i
              onClick={() => {
                setSearchedActivities([]);
                setSearchTerms("");
                setNotFound(false);
              }}
              className="fa-solid fa-arrow-rotate-left"
              style={{ color: "#28a745", cursor: "pointer" }}></i>
          </span>
          <input
            id="topic-search"
            className="form-control search-bar"
            value={searchTerms}
            onChange={(e) => handleInputChange(e)}
            type="text"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder = notFound
                ? "Couldn't find anything, try another key word!"
                : "Type key words to find what you're looking for.")
            }
            placeholder={
              notFound
                ? "Couldn't find anything, try another key word!"
                : "Type key words to find what you're looking for."
            }
          />
          <button
            className="btn btn-success"
            id="button-addon2">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

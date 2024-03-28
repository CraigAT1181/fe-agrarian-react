import React, { useState } from "react";
import "../App.css";

export default function SearchBar({ activities, setSearchedActivities }) {
  const [searchTerms, setSearchTerms] = useState("");
  let [notFound, setNotFound] = useState(false);
  let [placeholder, setPlaceholder] = useState(
    "Type key words to find what you're looking for."
  );

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
        setPlaceholder("Couldn't find anything, try another key word!");
      }
      setNotFound(false);
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
                setPlaceholder(
                  "Type key words to find what you're looking for."
                );
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
            placeholder={placeholder}
          />
          <button
            className="btn btn-success"
            id="button-addon2">
            Search
          </button>
        </div>
      </form>
      {notFound && <p className="text-danger">{notFound}</p>}
    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function SearchBar({ activities, setSearchedActivities }) {
  const [searchTerms, setSearchTerms] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);
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
      setActiveSearch(true);
      if (filteredActivities.length === 0) {
        setNotFound(true);
      }
    }
  };

  const handleClear = () => {
    setSearchedActivities([]);
    setSearchTerms("");
    setNotFound(false);
    setActiveSearch(false);
  };

  return (
    <div className="flex-col text-center">
      <div className="search-bar-container">
        <form onSubmit={handleSearch}>
          <div className="w-full relative">
            <label
              htmlFor="item-search"
              className="form-label"
              aria-label="Search"></label>
            <input
              id="item-search"
              className="search-bar-input"
              onChange={handleInputChange}
              type="text"
              value={searchTerms}
              placeholder="What are you looking for?"
            />
            <button
              type="submit"
              className="search-button">
              <i
                className="fa-solid fa-magnifying-glass"
                aria-label="search button"
                title="search button"></i>
            </button>
          </div>
        </form>
      </div>
      {activeSearch && (
        <div className="flex flex-col justify-center">
          <button
            className="text-blue-700 text-sm"
            onClick={handleClear}>
            clear results
          </button>
          <div className="flex justify-center">
            <p className="mb-1">{`Search results for "${searchTerms}"`}</p>
          </div>
        </div>
      )}
      {activeSearch && notFound && (
        <div>
          <span>Unable to find any results from your search.</span>
        </div>
      )}
    </div>
  );
}

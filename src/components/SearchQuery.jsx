import React, { useState, useEffect } from "react";
import { getPosts } from "../api/api";

export default function SearchQuery({
  setNotFound,
  setFilteredPosts,
  searchParams,
  setSearchParams,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getPosts(searchParams)
      .then(({ posts, message }) => {
        setIsLoading(false);

        if (Array.isArray(posts)) {
          setFilteredPosts(posts);
          setSearchParams("");
        } else if (message) {
          setNotFound(message);
        }
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setIsLoading(false);
          setError({ status, message });
        }
      );
  };

  if (isLoading) return <p>Searching...</p>;
  if (error)
    return (
      <p>
        Error {error.status} {error.message}
      </p>
    );

  return (
    <form className="mx-5" onSubmit={(e) => handleSearch(e)}>
      <div className="input-group">
        <label
          htmlFor="item-search"
          className="form-label"
          aria-label="Search"
          aria-describedby="button-addon2"
        ></label>
        <input
          id="item-search"
          className="form-control"
          onChange={({ target }) => setSearchParams(`item=${target.value}`)}
          type="text"
          placeholder="What are you looking for?"
        />
        <button className="btn btn-success" id="button-addon2">
          Search
        </button>
      </div>
    </form>
  );
}

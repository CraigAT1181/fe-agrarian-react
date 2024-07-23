import React, { useEffect, useState } from "react";

import { getUsers } from "../api/api";

export default function MessengerSearchBar() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setIsLoading(true);
    getUsers()
      .then(({ users }) => {
        setAllUsers(users);
        setIsLoading(false);
      })
      .catch(
        ({
          response: {
            status,
            data: { message },
          },
        }) => {
          setError({ status, message: message });
          setIsLoading(false);
        }
      );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerms) {
        const filteredUsers = allUsers.filter((user) =>
          user.username.toLowerCase().includes(searchTerms.toLowerCase())
        );
        setResults(filteredUsers);
      } else {
        setResults([]);
      }
    }, 300); // Delay of 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerms, allUsers]);

  const handleInputChange = (e) => {
    setSearchTerms(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // setActiveSearch(true);
    // const searchTerm = searchTerms.toLowerCase();
    // if (blogs.length > 0) {
    //   const filtered = blogs.filter((blog) => {
    //     const searchTermsArray = searchTerm.split(" ");
    //     return (
    //       blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
    //       searchTermsArray.some((word) =>
    //         blog.username.toLowerCase().includes(word)
    //       ) ||
    //       searchTermsArray.some((word) =>
    //         blog.title.toLowerCase().includes(word)
    //       )
    //     );
    //   });
    //   setFilteredBlogs(filtered);
    //   if (filtered.length === 0) {
    //     setNotFound("Couldn't find any results.");
    //   } else {
    //     setNotFound("");
    //   }
    // }
  };

  if (isLoading)
    return (
      <div className="flex text-center mt-4">
        <i className="fa-solid fa-spinner fa-spin"></i>
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
    <div className="flex justify-center">
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
              onChange={(e) => handleInputChange(e)}
              type="text"
              placeholder="Search for a user"
              value={searchTerms}
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
        <div className={`search-results ${searchTerms ? "" : "hidden"}`}>
          {results && results.length > 0 ? (
            results.map((user) => (
              <div
                key={user.user_id}
                className="text-center my-1 hover:bg-white">
                <button className="p-1 rounded w-full" onClick={() => setSearchTerms(user.username)}>{user.username}</button>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
}

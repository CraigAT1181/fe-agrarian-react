import React, { useState } from "react";
import ContactList from "./ContactList";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function Messenger() {
  const [conversationID, setConversationID] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messageSent, setMessageSent] = useState(false);

  const [searchTerms, setSearchTerms] = useState("");

  const handleInputChange = (e) => {
    setSearchTerms(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // setActiveSearch(true);
    const searchTerm = searchTerms.toLowerCase();
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

  return (
    <div className="messenger-container">

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
        </div>
      </div>


    </div>
  );
}

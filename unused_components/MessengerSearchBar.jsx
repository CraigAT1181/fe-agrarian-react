import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { addConversationByUserID, getUsers } from "../api/api";

export default function MessengerSearchBar({
  conversations,
  fetchConversations,
  setExistingChat,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userNotFound, setUserNotFound] = useState("");
  const { user } = useAuth();

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
          setError({ status, message });
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
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerms, allUsers]);

  const handleInputChange = (e) => {
    setSearchTerms(e.target.value);
    setSelectedUser(null);
    setUserNotFound("");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    let userToSearch = selectedUser;

    if (!userToSearch) {
      userToSearch = results.find(
        (u) => u.username.toLowerCase() === searchTerms.toLowerCase()
      );
      if (!userToSearch) {
        setUserNotFound("We couldn't find that user! Try again.");
        return;
      }
    }

    const activeConversations = conversations.filter((conversation) => {
      return (
        (conversation.user1_id === user.userID &&
          !conversation.user1_is_deleted) ||
        (conversation.user2_id === user.userID &&
          !conversation.user2_is_deleted)
      );
    });

    console.log("active conversations:", activeConversations);

    let conversationExists = false;
    let partnerId = null;

    activeConversations.forEach((conversation) => {
      if (
        conversation.user1_id === userToSearch.user_id &&
        conversation.user1_id !== user.userID
      ) {
        conversationExists = true;
        partnerId = conversation.user1_id;
        setExistingChat(conversation);
      }

      if (
        conversation.user2_id === userToSearch.user_id &&
        conversation.user2_id !== user.userID
      ) {
        conversationExists = true;
        partnerId = conversation.user2_id;
        setExistingChat(conversation);
      }
    });

    if (!conversationExists) {
      partnerId = userToSearch.user_id;

      if (partnerId !== null) {
        setIsLoading(true);
        addConversationByUserID(user.userID, partnerId)
          .then(() => {
            setIsLoading(false);
            fetchConversations();
          })
          .catch((error) => {
            setIsLoading(false);
            setError(error.response?.data.message || "An error occurred");
          });
      }
    }
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
        {userNotFound && (
          <div className="flex justify-center">
            <p className="text-red-700">{userNotFound}</p>
          </div>
        )}

        <form onSubmit={handleSearch}>
          <div className="w-full relative">
            <label
              htmlFor="item-search"
              className="form-label"
              aria-label="Search"
            ></label>
            <input
              id="item-search"
              className="search-bar-input"
              onChange={handleInputChange}
              type="text"
              placeholder="Search for a user"
              value={searchTerms}
            />
            <button type="submit" className="search-button">
              <i
                className="fa-solid fa-magnifying-glass"
                aria-label="search button"
                title="search button"
              ></i>
            </button>
          </div>
        </form>
        <div className={`search-results ${searchTerms ? "" : "hidden"}`}>
          {results && results.length > 0 ? (
            results.map((returnedUser) =>
              returnedUser.user_id !== user.userID ? (
                <div
                  key={returnedUser.user_id}
                  className="text-center my-1 hover:bg-white"
                >
                  <button
                    className={`p-1 rounded w-full ${
                      selectedUser &&
                      selectedUser.user_id === returnedUser.user_id
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onClick={() => {
                      setSearchTerms(returnedUser.username);
                      setSelectedUser(returnedUser);
                    }}
                  >
                    {returnedUser.username}
                  </button>
                </div>
              ) : null
            )
          ) : (
            <div className="flex justify-center">
              <p>No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

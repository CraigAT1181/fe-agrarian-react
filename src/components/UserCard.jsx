import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../App.css";

export default function UserCard({ users }) {
  console.log(users);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleMessageClick = () => {
    navigate("/messenger");

    // After completing Messenger functionality - use code to complete this button functionality.
  };
  return (
    <>
      {users.map((person) => {
        return (
          <article
            id="UserCard"
            className="card shadow mt-4 "
            key={person.user_id}
            style={{
              width: "25rem",
              height: "auto",
              marginRight: "3rem",
            }}
          >
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  className="card-img"
                  style={{ width: "6rem" }}
                  src="https://via.placeholder.com/150"
                  alt="User Image"
                />
              </div>
              <div className="col text-center">
                <div className="d-flex-col mt-4">
                  <h4 className="card-title">{person.username}</h4>

                  <div className="mb-1">
                    {user &&
                      (user.user_id !== person.user_id ? (
                        <button
                          className="btn btn-success mt-2"
                          style={{ width: "8rem" }}
                          onClick={handleMessageClick}
                        >
                          Message
                        </button>
                      ) : (
                        <p style={{ color: "red" }}>(You)</p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="d-flex m-1 mt-2 mb-2 justify-content-center"
              style={{ overflowX: "auto" }}
            >
              {person.produce.length > 0 ? (
                person.produce.map((item, index) => {
                  return (
                    <p
                      className="custom-outline-success"
                      style={{ marginLeft: "1rem" }}
                      key={index}
                    >
                      {item}
                    </p>
                  );
                })
              ) : (
                <p
                  className="custom-outline-danger"
                  style={{ marginLeft: "1rem" }}
                >
                  No produce available.
                </p>
              )}
            </div>
            <div className="row"></div>
          </article>
        );
      })}
    </>
  );
}

import React from "react";
import { useAuth } from "./AuthContext";
import "../App.css";
import MessageButton from "./MessageButton";

export default function UserCard({ users }) {
  const { user } = useAuth();

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
            }}>
            <div className="row no-gutters">
              <div className="col text-center">
                <div className="d-flex-col mt-4">
                  <h4 className="card-title">{person.username}</h4>

                  <div className="mb-1">
                    {user &&
                      (user.userID !== person.user_id ? (
                        <MessageButton partner={person.user_id} />
                      ) : (
                        <p style={{ color: "red" }}>(You)</p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="d-flex m-1 mt-2 mb-2 justify-content-center"
              style={{ overflowX: "auto" }}>
              {person.produce.length > 0 ? (
                person.produce.map((item, index) => {
                  return (
                    <p
                      className="custom-outline-success"
                      style={{ marginLeft: "1rem" }}
                      key={index}>
                      {item}
                    </p>
                  );
                })
              ) : (
                <p
                  className="custom-outline-danger"
                  style={{ marginLeft: "1rem" }}>
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

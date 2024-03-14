import React from "react";
import { useAuth } from "./AuthContext";
import "../App.css";
import MessageButtonL from "./MessageButtonL";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UserCard({ users }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {users.map((person) => (
        <article
          id="UserCard"
          className="user-card mb-3 p-3"
          key={person.user_id}>
          <div className="text-center">
            <h4 className="card-title">{person.username}</h4>
            <div className="my-2">
              {user &&
                (user.userID !== person.user_id ? (
                  <MessageButtonL partner={person.user_id} />
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}>
                    Edit Produce
                  </button>
                ))}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <ListGroup
              style={{
                display: "flex",
                flexDirection: "row",
                overflowX: "auto",
              }}>
              {person.produce.length > 0 ? (
                person.produce.sort().map((item, index) => (
                  <ListGroupItem
                    key={index}
                    style={{
                      whiteSpace: "nowrap",
                      marginRight: "0.4rem",
                      border: "1px solid #28a745",
                      color: "#28a745",
                      margin: "0.5rem",
                    }}>
                    {item}
                  </ListGroupItem>
                ))
              ) : (
                <p className="custom-outline-danger">No produce available.</p>
              )}
            </ListGroup>
          </div>
        </article>
      ))}
    </div>
  );
}

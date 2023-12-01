import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../App.css";

export default function UserCard({ users }) {
  return (
    <>
      {users.map((user) => {
        return (
          <article
          id="UserCard"
            className="card shadow mt-4 "
            key={user.user_id}
            style={{
              width: "25rem",
              height: "auto",
              marginRight: "3rem",
            }}>
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
                  <h4 className="card-title">{user.user_name}</h4>
                  <Link to="#">{`View Garden`}</Link>
                  <div className="mb-1">
                    <button
                      className="btn btn-success mt-2"
                      style={{ width: "8rem" }}>
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex m-1 mt-2 mb-2 justify-content-start">
              {user.produce.map((item, index) => {
                return (
                  <p
                    className="custom-outline-success"
                    style={{ marginLeft: "1rem" }}
                    key={index}>
                    {item}
                  </p>
                );
              })}
            </div>
            <div className="row"></div>
          </article>
        );
      })}
    </>
  );
}

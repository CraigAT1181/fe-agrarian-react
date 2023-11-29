import React from "react";

export default function UserCard({ users }) {
  return (
    <>
      {users.map((user) => {
        return (
          <article
            className="card shadow-sm p-3 mb-5 bg-white rounded"
            key={user.user_id}
            style={{
              width: "auto",
              height: "auto",
              margin: "1rem",
              padding: "0.5rem",
            }}>
            <div className="d-flex justify-content-center">
              {user.produce.map((item, index) => {
                return (
                  <p
                    className="card m-1 mb-0 p-1"
                    key={index}>
                    {item}
                  </p>
                );
              })}
            </div>

            <div className="d-flex justify-content-center">
              <p className="mt-2 fw-bold">{user.user_name}</p>
            </div>

            <button>Message</button>
          </article>
        );
      })}
    </>
  );
}

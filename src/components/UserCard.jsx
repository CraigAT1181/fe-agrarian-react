import React from "react";

export default function UserCard({ users }) {
  return (
    <>
      {users.map((user) => {
        return (
          <article
            className="card border border-danger"
            key={user.user_id}
            style={{
              width: "auto",
              height: "5rem",
              margin: "1rem",
              padding: "0.5rem",
            }}>
            <div className="d-flex justify-content-center">
              <p>{user.user_name}</p>
              <ul key={user.produce}>
                {user.produce.map((produce)=>{
return <p>{produce}</p>
                })}
              </ul>
            </div>
            <button>Message</button>
          </article>
        );
      })}
    </>
  );
}

import React from "react";

export default function Profile({ loggedUser, setLoggedIn }) {
  return (
    <>
      <div>
        <h3>Welcome back</h3>
        <h5>{loggedUser.user_name}</h5>
      </div>
      <div>
        <button
          className="btn btn-outline-success"
          onClick={() => {
            setLoggedIn(false);
          }}>
          Log Out
        </button>
      </div>
    </>
  );
}

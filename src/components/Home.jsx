import React from "react";
import { useAuth } from "./AuthContext";
import MyProduce from "./MyProduce";
import MyPosts from "./MyPosts";
import "../App.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container h-100 d-flex flex-grow-1">
      {user !== null ? (
        <div className="row w-100">
          <MyProduce />

          <MyPosts />
        </div>
      ) : (
        <div
          className="container d-flex text-center justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="box-border p-4">
            <h3>Join the Community</h3>
            <p className="m-4">
              Register using the button at the top to join a community <br />
              of people who want to connect, share, and re-capture the natural
              skills and independence of our ancestors!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

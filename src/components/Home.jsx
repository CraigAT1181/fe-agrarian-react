import React from "react";
import { useAuth } from "./AuthContext";
import MyProduce from "./MyProduce";
import MyPosts from "./MyPosts";
import "../App.css";
import MyBlogs from "./MyBlogs";
import { Alert } from "react-bootstrap";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container h-100 d-flex flex-grow-1">
      {user !== null ? (
        <div className="row w-100">
          <MyProduce />

          <MyPosts />

          <MyBlogs />
        </div>
      ) : (
        <div className="col">
          <div>
            <Alert
              variant="success"
              className="text-center">
              <h3 className="fw-bold">Currently under development:</h3>
              <i className="fa-solid fa-2x fa-user-graduate"></i>{" "}
              <p>
                {" "}
                Building a page dedicated to advertising and organising
                educational and community activities.
              </p>
            </Alert>
          </div>
          <div>
            <Alert
              variant="danger"
              className="text-center">
              <h3 className="fw-bold">Reminder:</h3>
              
              <p>
                {" "}
                This application is in BETA and is actively being worked on.
                Apologies if you experience any issues loading pages, but do try
                back later if you do. Thank you.{" "}
              </p>
            </Alert>
          </div>
          <div
            className="container d-flex text-center justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}>
            <div className="p-4">
              <h3>Join the Community</h3>
              <p className="mx-4">
                Register using the button at the top to join a community <br />
                of people who want to connect, share, and re-capture the natural
                skills and food-independence of our ancestors!
              </p>
              <img
                src="/CookingPotLogo.jpg"
                alt="Cooking Pot Logo"
                style={{ height: "20rem" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

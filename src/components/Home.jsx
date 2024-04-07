import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import MyProduce from "./MyProduce";
import MyPosts from "./MyPosts";
import MyActivities from "./MyActivities";
import "../App.css";
import MyBlogs from "./MyBlogs";
import { Alert, Navbar } from "react-bootstrap";
import HomeNav from "./HomeNav";

export default function Home() {
  const { user } = useAuth();
  const [selectedComponent, setSelectedComponent] = useState("MyProduce");

  return (
    <div className="container h-100">
      {user !== null ? (
        <div className="col">
          <div
            className="row"
            style={{ boxShadow: "0 0 10px 0 #ccc" }}>
            <HomeNav setSelectedComponent={setSelectedComponent} />
          </div>
          <div
            className="row"
            style={{
              boxShadow: "0 0 10px 0 #ccc",
              height: "30vw",
              paddingTop: "1rem",
              marginTop: "1rem",
            }}>
            {selectedComponent === "MyProduce" && <MyProduce />}
            {selectedComponent === "MyPosts" && <MyPosts />}
            {selectedComponent === "MyBlogs" && <MyBlogs />}
            {selectedComponent === "MyActivities" && <MyActivities />}
          </div>
        </div>
      ) : (
        <div className="col">
          <div>
            <Alert
              variant="success"
              className="text-center">
              <h3 className="fw-bold">Currently under development:</h3>
              <i className="fa-solid fa-2x fa-calendar-days"></i>{" "}
              <p>
                {" "}
                Working on Google Calendar functionality to allow a
                fully-customizable calendar for helping to manage growing
                activities.
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
                This application is actively being worked on. Apologies if you
                experience any issues loading pages, but do try back later if
                you do. Thank you.{" "}
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

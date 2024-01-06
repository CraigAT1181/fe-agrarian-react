import React from "react";
import { useAuth } from "./AuthContext";
import MyProduce from "./MyProduce";
import MyPosts from "./MyPosts";
import "../App.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container p-3">
      {user !== null ? (
        <div className="row g-3">
          <div>
            <MyProduce />
          </div>
          <div>
            <MyPosts />
          </div>
        </div>
      ) : (
        <div className="text-center p-3">
          <h3>Join the Agrarian Community</h3>
          <p className="m-4">
            Register using the button at the top to join a community <br />
            of people who want to connect, share and re-capture the independence
            and food-security of our ancestors!
          </p>
        </div>
      )}
    </div>
  );
}

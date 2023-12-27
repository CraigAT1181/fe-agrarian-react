import React from "react";
import { useAuth } from "./AuthContext";
import MyProduce from "./MyProduce";
import MyPosts from "./MyPosts";
import "../App.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="container">
      {user !== null ? (
        <>
          <div className="p-4 mb-2">
            <MyProduce />
          </div>
          <div className="p-4 mb-2">
            <MyPosts />
          </div>
        </>
      ) : (
        <div className="text-center">
          <h3>Join the Agrarian Community</h3>
          <p className="m-4">
            Register using the button at the top to join a community <br />
            of people who want to connect, share and re-capture the independence
            and food-security of our ancestors!
          </p>
        </div>
      )}
    </section>
  );
}

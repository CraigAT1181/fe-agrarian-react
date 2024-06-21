import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import MyProduce from "./MyProduce";
import MyPosts from "./MyPosts";
import MyActivities from "./MyActivities";
import MyBlogs from "./MyBlogs";

export default function Home() {
  const { user } = useAuth();
  const [clickedIndex, setClickedIndex] = useState(0);
  const sections = ["Produce", "Posts", "Blogs", "Activities"];

  const handleClick = (index) => {
    setClickedIndex(index === clickedIndex ? null : index);
  };

  const handleDisplay = (index) => {
    if (index === 0) {
      return (
        <div>
          <MyProduce />
        </div>
      );
    } else if (index === 1) {
      return (
        <div>
          <MyPosts />
        </div>
      );
    } else if (index === 2) {
      return (
        <div>
          <MyBlogs />
        </div>
      );
    } else if (index === 3) {
      return (
        <div>
          <MyActivities />
        </div>
      );
    }
  };

  return (
    <div className="text-green-950">
      <div className="text-center">
        <h6>Hi {user.username}</h6>
      </div>
      <div className="mt-4">
        {sections.map((section, index) => (
          <div key={index}>
            <div>
              <div
                className="cursor-pointer"
                onClick={() => handleClick(index)}
              >
                <span className="font-semibold">{section}</span>
              </div>
              <hr className="mt-1" />
            </div>
            <div className={clickedIndex === index ? "" : "hidden"}>
              {handleDisplay(index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

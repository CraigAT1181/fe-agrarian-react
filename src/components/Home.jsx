import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import LoginReg from "./LoginReg";
import MyProduce from "./MyProduce";
import MyPosts from "./MyPosts";
import MyActivities from "./MyActivities";
import MyBlogs from "./MyBlogs";
import HomeNav from "./HomeNav";

export default function Home() {
  const { user } = useAuth();
  const [selectedComponent, setSelectedComponent] = useState("MyProduce");

  // useEffect(() => {
  //   localStorage.removeItem("token");
  // }, []);

  return (
    <div>
      {user !== null ? (
        <div>
          <div>
            <HomeNav setSelectedComponent={setSelectedComponent} />
          </div>
          <div>
            {selectedComponent === "MyProduce" && <MyProduce />}
            {selectedComponent === "MyPosts" && <MyPosts />}
            {selectedComponent === "MyBlogs" && <MyBlogs />}
            {selectedComponent === "MyActivities" && <MyActivities />}
          </div>
        </div>
      ) : (
        <div className="hidden md:block my-20 text-center"></div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import Drawer from "./Drawer";
import NavBar from "./NavBar";
import LoginReg from "./LoginReg";

export default function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="header">
      <div className="title">cookingpot.live</div>
      <button
        onClick={toggleDrawer}
        className="hamburger">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div className="hidden md:block">
        <NavBar />
      </div>
      <div className="hidden md:block">
        <LoginReg />
      </div>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
    </header>
  );
}

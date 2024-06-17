import React, { useState } from "react";
import DrawerHeader from "./DrawerHeader";
import NavbarHeader from "./NavbarHeader";
import LoginReg from "./LoginReg";

export default function Header() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <header className="header">
      <h1 className="title">cookingpot.live</h1>
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
      <div className="hidden lg:block">
        <NavbarHeader />
      </div>
      <div className="hidden lg:block">
        <LoginReg />
      </div>
      <DrawerHeader
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
    </header>
  );
}

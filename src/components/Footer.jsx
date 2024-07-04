import React, { useState } from "react";
import NavbarFooter from "./NavbarFooter";
import DrawerFooter from "./DrawerFooter";

export default function Footer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <footer className="footer">
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
        <NavbarFooter />
      </div>

      <div className="text-start">
        <DrawerFooter
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
      </div>

      <div className="mt-4">
        &copy; 2022 The Cooking Pot CIC. All rights reserved.
      </div>
    </footer>
  );
}

import React, { useEffect, useState } from "react";
import DrawerHeader from "./DrawerHeader";
import NavbarHeader from "./NavbarHeader";
import LoginReg from "./LoginReg";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Header() {
  const [pageTitle, setPageTitle] = useState("");

  const location = useLocation();

  const { toggleDrawer } = useAuth();

  useEffect(() => {
    const path = location.pathname.substring(1);

    const firstSegment = path.split("/")[0];

    const title = path
      ? path.charAt(0).toUpperCase() + firstSegment.slice(1)
      : "Exchange";
    setPageTitle(title);
  }, [location]);

  return (
    <header className="header">
      <h1 className="title">cookingpot.live</h1>

      <div className="flex items-center lg:hidden">
        <button onClick={toggleDrawer} className="hamburger ml-1">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="hidden lg:block">
        <NavbarHeader pageTitle={pageTitle} />
      </div>
      <div className="hidden lg:block">
        <LoginReg />
      </div>
      <DrawerHeader />
    </header>
  );
}

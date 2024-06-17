import React from "react";
import { Link } from "react-router-dom";

export default function DrawerFooter({ isDrawerOpen, toggleDrawer }) {
  return (
    <div
      className={`drawer-secondary transform ${
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform`}
      onClick={toggleDrawer}>
      <div
        className="drawer-primary"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={toggleDrawer}
          className="drawer-close">
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
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <nav className="drawer-nav">
        <Link
          to="/about"
          className="drawer-nav-item">
          About
        </Link>
        <Link
          to="/privacy"
          className="drawer-nav-item">
          Privacy Policy
        </Link>
        <Link
          to="/cookies"
          className="drawer-nav-item">
          Cookie Policy
        </Link>
        <Link
          to="/offer-support"
          className="drawer-nav-item">
          Offer Support
        </Link>
        <Link
          to="/contact"
          className="drawer-nav-item">
          Contact Us
        </Link>
        <Link
          to="#"
          className="drawer-nav-item">
          News
        </Link>
        </nav>
      </div>
    </div>
  );
}

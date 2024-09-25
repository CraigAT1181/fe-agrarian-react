import React from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function DrawerHeader() {
  const { user, handleLogout, isDrawerOpen, toggleDrawer } = useAuth();
  const navigate = useNavigate();

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

        {/* User section */}
        <div className="drawer-user-section">
          {user && (
            <>
              {/* User information */}
              <div className="flex justify-center overflow-hidden">
                <img
                  src={user.profile_pic}
                  className="drawer-profile-icon border-3 border-green-900 rounded-lg mb-2"
                  alt="User's profile picture"
                />
              </div>
              <div className="text-center">
                <p className="mb-0 font-thin">{user.user_name}</p>
                <p className="mb-0 font-thin">{user.towns.town_name}</p>
                <div className="flex justify-center">
                  <p className="mb-0 font-thin mr-1">
                    {user.allotments.allotment_name}
                  </p>
                  <p className="mb-0 font-thin ml-1">| {user.plot}</p>
                </div>
              </div>

              <hr className="mb-0" />
            </>
          )}
        </div>
        <nav className="drawer-nav">
          {user ? (
            <>
              <div className="flex items-center">
                <div className="w-6">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <div className=" ml-4">
                  <Link
                    to={`/allotments/${user.allotments.allotment_name}`}
                    className="drawer-nav-item"
                    onClick={toggleDrawer}>
                    Allotment
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6">
                  <i className="fa-solid fa-house-flag"></i>
                </div>
                <div className="ml-4">
                  <Link
                    to={`/towns/${user.towns.town_name}`}
                    className="drawer-nav-item"
                    onClick={toggleDrawer}>
                    Town
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6">
                  <i className="fa-solid fa-newspaper"></i>
                </div>
                <div className="ml-4">
                  <Link
                    to="/ads"
                    className="drawer-nav-item"
                    onClick={toggleDrawer}>
                    Ads
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6">
                  <i className="fa-solid fa-feather-pointed"></i>
                </div>
                <div className="ml-4">
                  <Link
                    to={`/blogs`}
                    className="drawer-nav-item"
                    onClick={toggleDrawer}>
                    Blogs
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6">
                  <i className="fa-solid fa-bookmark"></i>
                </div>
                <div className="ml-4">
                  <Link
                    to={`/bookmarks`}
                    className="drawer-nav-item"
                    onClick={toggleDrawer}>
                    Bookmarks
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="ml-4">
                  <Link
                    to={`/inbox`}
                    className="drawer-nav-item"
                    onClick={toggleDrawer}>
                    Inbox
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6">
                  <i className="fa-solid fa-bell"></i>
                </div>
                <div className="ml-4">
                  <Link
                    to={`/notifications`}
                    className="drawer-nav-item"
                    onClick={toggleDrawer}>
                    Notifications
                  </Link>
                </div>
              </div>
              <div className="flex items-center mt-14">
                <div className="w-6">
                  <i className="fa-solid fa-cog"></i>
                </div>
                <div className="ml-4">
                  <Link
                    to={`/settings`}
                    className="drawer-nav-item"
                    onClick={toggleDrawer}>
                    Settings
                  </Link>
                </div>
              </div>{" "}
              <div className="flex items-center">
                <div className="w-6">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <div className="ml-4">
                  <Link
                    className="drawer-nav-item"
                    onClick={handleLogout}>
                    Log out
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-4 text-center">
              <div className="absolute left-10 text-center">
                <h1 className="font-semibold mb-4">Welcome!</h1>
                <p className="mb-6">Sign up or log in below...</p>
                <div className="flex justify-center">
                  <button
                    className="login-button-drawer"
                    onClick={() => navigate("/login")}>
                    Login
                  </button>
                  <button
                    className="register-button-drawer"
                    onClick={() => navigate("/register")}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}

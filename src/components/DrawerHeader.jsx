import React from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function DrawerHeader({ isDrawerOpen, toggleDrawer }) {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className={`drawer-secondary transform ${
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform`}
      onClick={toggleDrawer}
    >
      <div className="drawer-primary" onClick={(e) => e.stopPropagation()}>
        <button onClick={toggleDrawer} className="drawer-close">
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div className="drawer-user-section">
          {user ? (
            <>
              <div className="flex justify-center overflow-hidden">
                <img
                  src={user.profile_pic}
                  className="drawer-profile-icon border-3 border-green-900 rounded-lg mb-4"
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
            </>
          ) : (
            <>
              <div className="text-center m-0 font-semibold">
                <p>Join the Hive!</p>
              </div>
              <div className="flex justify-center">
                <button
                  className="login-button-drawer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="register-button-drawer"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            </>
          )}
        </div>
        <hr />

        <nav className="drawer-nav">
          <Link
            to="/exchange"
            className="drawer-nav-item"
            onClick={toggleDrawer}
          >
            Exchange
          </Link>
          <Link to="/posts" className="drawer-nav-item" onClick={toggleDrawer}>
            Posts
          </Link>
          <Link to="/blogs" className="drawer-nav-item" onClick={toggleDrawer}>
            Blogs
          </Link>
          <Link
            to="/activities"
            className="drawer-nav-item"
            onClick={toggleDrawer}
          >
            Activities
          </Link>
          {user && (
            <Link
              to="/messenger"
              className="drawer-nav-item"
              onClick={toggleDrawer}
            >
              Messenger
            </Link>
          )}

          {user ? (
            <div>
              {" "}
              <button className="drawer-nav-item mt-4" onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="drawer-nav-item mt-6"
                onClick={toggleDrawer}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="drawer-nav-item"
                onClick={toggleDrawer}
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}

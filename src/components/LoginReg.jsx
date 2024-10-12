import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function LoginReg() {
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center">
          <div className="flex relative">
            <i
              className="fa-solid text-green-900 mx-2 fa-user cursor-pointer"
              onClick={toggleUserMenu}
            ></i>

            {userMenuVisible && (
              <div className="user-menu">
                <div className="drawer-user-section">
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
                </div>
                <div
                  className="user-menu-item"
                  onClick={() => {
                    toggleUserMenu();
                    navigate("/settings");
                  }}
                >
                  <div className="w-6">
                    <i className="fa-solid fa-sm text-green-900 fa-gear"></i>
                  </div>
                  <div className="ml-4">
                    <div className="drawer-nav-item text-sm">Settings</div>
                  </div>
                </div>
                <div className="user-menu-item" onClick={handleLogout}>
                  <div className="w-6">
                    <i className="fa-solid fa-sm fa-right-from-bracket"></i>
                  </div>
                  <div className="ml-4">
                    <div className="drawer-nav-item text-sm">Log out</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login" className="login-reg-button">
            Login
          </Link>
          <Link to="/register" className="login-reg-button">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

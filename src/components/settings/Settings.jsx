import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { deleteUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, handleLogout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleDelete = () => {
    if (
      user &&
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      setIsLoading(true);

      deleteUser(user.user_id)
        .then(() => {
          setIsLoading(false);
          handleLogout();
        })
        .catch(({ error }) => {
          setIsLoading(false);
          setError(error);
        });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settings-container p-4">
      <div className="flex justify-end pb-2">
        <button
          className="flex border-2 border-gray-700 rounded-full px-8 relative"
          onClick={() => navigate(-1)}>
          <i className="fa-solid absolute top-1 left-1 fa-chevron-left"></i>
          <span>Back</span>
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className={`bg-red-500 text-white py-2 px-4 rounded ${
            isLoading ? "opacity-50" : "hover:bg-red-600"
          }`}>
          {isLoading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}

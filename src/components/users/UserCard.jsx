import React from "react";

export default function UserCard({ user }) {
  return (
    <div>
      {user && (
        <div className="border rounded-lg">
          <div className="flex flex-col">
            <div className="flex flex-col text-center bg-gray-200 py-2">
              <div className="flex justify-center">
                <img
                  src={user.profile_pic}
                  alt="User's profile picture"
                  className="w-48 h-48 shadow-md shadow-gray-700 object-cover rounded-full"
                />
              </div>
              <h2 className="mt-4">{user.user_name}</h2>
              <p className="font-thin m-0">{user.postcode}</p>
              <p className="font-thin m-0">{user.email}</p>
            </div>
            <div className="flex-col text-center p-2">
              <div></div>
              <button className="bg-green-900 w-fit text-white py-2 px-12 rounded-full">
                Send message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { useAuth } from "../contexts/AuthContext";

export default function AdCard({ ad, handleDeleteAd }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const { user } = useAuth();

  console.log(ad);

  // ---------------- Format dates for rendering

  const formattedTime = ad.created_at
    ? formatDistanceToNow(new Date(ad.created_at), {
        addSuffix: true,
      })
    : "just now";

  function formatDate(dateString) {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return format(date, `EEEE, do 'of' MMMM yyyy 'at' h:mma`);
  }

  const formattedDate = formatDate(ad.created_at);

  // ----------------------------------------------

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleImageClick = (e, mediaUrl) => {
    e.stopPropagation();
    setSelectedMedia(mediaUrl);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setSelectedMedia(null);
  };

  return (
    <div className="flex flex-col w-full relative border border-gray-700 shadow-md rounded-lg p-4 bg-white">
      {/* Left Side: User Info */}
      <div className="flex w-full">
        <div className="flex flex-col items-center text-sm space-y-2 w-1/4">
          <img
            src={ad.users.profile_pic}
            alt="User's profile picture."
            className="w-12 h-12 object-cover rounded-full border border-gray-300"
          />
          <div className="text-center">
            <p className="font-medium text-gray-800">{ad.users.user_name}</p>
            <p className="text-xs text-gray-500">
              {ad.users.allotments.allotment_name}
            </p>
          </div>
          {user && user.user_name !== ad.users.user_name && (
            <div className="flex">
              <button className="mt-0 text-sm font-semibold cursor-pointer">
                Reply
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="w-px h-auto mx-4 border-none bg-gray-300" />

        {/* Right Side: Ad Content */}
        <div className="flex flex-col flex-grow space-y-4 justify-between max-w-full overflow-hidden">
          {/* Ad Title */}
          <h4 className="font-semibold break-words w-full max-w-full text-gray-800">
            {ad.title}
          </h4>

          {/* Ad Description */}
          <div className="flex justify-center">
            <p className="text-gray-600 break-words w-full max-w-full">
              {ad.content}
            </p>
          </div>

          <p className="text-sm font-semibold mb-0 mt-2">
            {formattedTime} <span className="font-thin">({formattedDate})</span>
          </p>
        </div>
      </div>

      {user && (
        <div className="absolute top-6 right-1">
          <div className="relative inline-block mr-2">
            <i
              className="fa-solid fa-ellipsis-vertical"
              onClick={toggleMenu}
            ></i>

            {menuVisible && (
              <div className="absolute right-0 mt-2 w-40 h-auto bg-white border border-gray-300 rounded shadow-lg z-50">
                <ul className="p-0">
                  {user.user_name === ad.users.user_name ? (
                    <li
                      className="px-2 py-2 text-center hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAd(ad.ad_id);
                      }}
                    >
                      Delete Ad
                    </li>
                  ) : (
                    <li
                      className="px-2 py-2 text-center hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Reply
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Media Section */}
      {ad.ads_media && ad.ads_media.length > 0 && (
        <>
          <hr className="bg-gray-700" />
          <div className="grid grid-cols-4 gap-1">
            {ad.ads_media.map((media) => (
              <div key={media.media_url}>
                <img
                  src={media.media_url}
                  alt="Attached media"
                  className="cursor-pointer w-20 h-20 object-cover"
                  onClick={(e) => handleImageClick(e, media.media_url)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <img
            src={selectedMedia}
            alt="Enlarged image"
            className="max-w-full max-h-full"
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={(e) => closeModal(e)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

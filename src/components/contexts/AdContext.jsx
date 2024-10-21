import React, { createContext, useContext, useState } from "react";
import { getAds, postAd, deleteAd } from "../../api/api";

const AdContext = createContext();

export const useAds = () => useContext(AdContext);

export const AdProvider = ({ children }) => {
  const postNewAd = async (newAdDetails) => {
    try {
      await postAd(newAdDetails);
    } catch (error) {
      console.error("Failed to add post", error);
    }
  };

  const removeAd = async (adId) => {
    try {
      await deleteAd(adId);
    } catch (error) {
      console.error("Failed to delete ad", error);
    }
  };

  //   const handlePostClick = (postId) => {
  //     navigate(`/posts/${postId}`);
  //   };

  return (
    <AdContext.Provider
      value={{
        postNewAd,
        removeAd,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

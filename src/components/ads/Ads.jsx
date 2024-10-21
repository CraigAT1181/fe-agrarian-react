import React, { useEffect, useState } from "react";
import AdDisplay from "./AdDisplay";
import PostAd from "./PostAd";
import { useAuth } from "../contexts/AuthContext";
import { useAds } from "../contexts/AdContext";
import { getAds } from "../../api/api";

export default function Ads() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ads, setAds] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const { user } = useAuth();
  const { removeAd, postNewAd } = useAds();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const fetchAds = async () => {
    if (user) {
      setIsLoading(true);
      try {
        const ads = await getAds(user.town_id);
        setAds(ads);
      } catch (error) {
        console.error("Failed to fetch ads", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAds();
  }, [user]);

  const handleDeleteAd = async (adId) => {
    setIsLoading(true);
    try {
      await removeAd(adId);
      await fetchAds();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostAd = async (adId) => {
    setIsLoading(true);
    try {
      await postNewAd(adId);
      await fetchAds();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading ads...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col flex-grow">
      <div className="bg-green-900 flex justify-center p-2 mb-1">
        <h1 className="mb-0 text-white font-thin">Ads</h1>
      </div>
      {user && (
        <div className="text-center">
          <p className="text-green-900">{user.towns.town_name}</p>
        </div>
      )}
      <div className="ad-display-container">
        <AdDisplay ads={ads} handleDeleteAd={handleDeleteAd} />
      </div>
      <button className="flex sticky bottom-4 justify-end" onClick={handleShow}>
        <p className="bg-green-900 text-white text-3xl font-semibold rounded-full p-4">
          +
        </p>
      </button>
      <PostAd
        show={showModal}
        handleClose={handleClose}
        handlePostAd={handlePostAd}
      />
    </div>
  );
}

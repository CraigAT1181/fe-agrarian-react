import React from "react";
import AdCard from "./AdCard";

export default function AdDisplay({ ads, handleDeleteAd }) {
  return (
    <>
      {ads && ads.length > 0 ? (
        <div className="ad-display">
          {ads.map((ad) => (
            <AdCard key={ad.ad_id} ad={ad} handleDeleteAd={handleDeleteAd} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No one has posted an ad yet!</p>
        </div>
      )}
    </>
  );
}

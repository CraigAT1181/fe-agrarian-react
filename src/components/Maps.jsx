import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const googleMapsApiKey = "AIzaSyBPEL9RgJfKnr58ff5ZEPSAituv9TMxRXY"; // Replace with your actual API key

export default function Maps({ users }) {
  const [postcodes, setPostcodes] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostcodes() {
      if (users.length > 0) {
        try {
          const userPostcodes = await Promise.all(
            users.map(async (user) => {
              const position = await userMapMarkers(user.postcode);
              return { position, title: user.postcode, user };
            })
          );

          // Filter out any null values (failed geocoding)
          const validPostcodes = userPostcodes.filter(
            (postcode) => postcode !== null
          );

          // Set center for the first marker
          if (validPostcodes.length > 0) {
            setCenter(validPostcodes[0].position);
          }

          setPostcodes(validPostcodes);
        } catch (error) {
          console.error("Error fetching postcodes:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchPostcodes();
  }, [users]);

  const userMapMarkers = async (postcode) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: postcode }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location.toJSON());
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
          reject(new Error(status)); // Resolve with null for failed geocoding
        }
      });
    });
  };

  const handleMarkerClick = (user, index) => {
    setSelectedUser(user);
    setSelectedMarkerIndex(index);
  };

  const handleInfoWindowClose = () => {
    setSelectedUser(null);
    setSelectedMarkerIndex(null);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            center={center}
            zoom={12}
            mapContainerStyle={{ width: "600px", height: "400px" }}>
            {postcodes.map((postcode, index) => (
              <Marker
                key={postcode.user.user_id}
                position={postcode.position}
                title={postcode.title}
                onClick={() => handleMarkerClick(postcode.user, index)}
              />
            ))}

            {selectedMarkerIndex !== null && !loading && (
              <InfoWindow
                position={postcodes[selectedMarkerIndex].position}
                onCloseClick={handleInfoWindowClose}>
                <div style={{ maxWidth: "auto", padding: "4px" }}>
                  <h6>{selectedUser.user_name}</h6>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
}

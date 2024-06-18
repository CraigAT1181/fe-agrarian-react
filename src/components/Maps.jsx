import React, { useEffect, useState } from "react";
import MapsInfoWindow from "./MapsInfoWindow";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

// Load additional libraries for Google Maps
const libraries = ["geometry", "drawing"];

export default function Maps({ users }) {
  const [postcodes, setPostcodes] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(12);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBPEL9RgJfKnr58ff5ZEPSAituv9TMxRXY", // Replace with your actual API key
    libraries,
  });

  // Fetch and process user postcodes
  useEffect(() => {
    async function fetchPostcodes() {
      if (users.length > 0) {
        setLoading(true);
        try {
          const userPostcodes = await Promise.all(
            users.map(async (user) => {
              const position = await userMapMarkers(user.postcode);
              return { position, title: user.postcode, user };
            })
          );

          const validPostcodes = userPostcodes.filter(
            (postcode) => postcode.position
          );

          if (validPostcodes.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            validPostcodes.forEach((postcode) => {
              bounds.extend(postcode.position);
            });

            setCenter({
              lat:
                (bounds.getSouthWest().lat() + bounds.getNorthEast().lat()) / 2,
              lng:
                (bounds.getSouthWest().lng() + bounds.getNorthEast().lng()) / 2,
            });

            const newZoom = getZoomLevel(bounds, { width: 600, height: 400 });
            setZoom(newZoom);
          }

          setPostcodes(validPostcodes);
        } catch (error) {
          console.error("Error fetching postcodes:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setPostcodes([]);
        setLoading(false);
      }
    }

    fetchPostcodes();
  }, [users]);

  // Function to geocode a postcode using Google Maps API
  const userMapMarkers = async (postcode) => {
    return new Promise((resolve) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: postcode }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location.toJSON());
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
          resolve(null); // Resolve with null to handle invalid postcodes gracefully
        }
      });
    });
  };

  // Calculate optimal zoom level to fit all markers
  const getZoomLevel = (bounds, mapDim) => {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;

    const latRad = (lat) => (lat * Math.PI) / 180;

    const latFraction =
      (latRad(bounds.getNorthEast().lat()) -
        latRad(bounds.getSouthWest().lat())) /
      Math.PI;

    const lngDiff = bounds.getNorthEast().lng() - bounds.getSouthWest().lng();
    const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

    const latZoom = () =>
      Math.round(
        Math.log(mapDim.height / WORLD_DIM.height / latFraction) / Math.LN2
      );

    const lngZoom = () =>
      Math.round(
        Math.log(mapDim.width / WORLD_DIM.width / lngFraction) / Math.LN2
      );

    return Math.min(latZoom(), lngZoom(), ZOOM_MAX);
  };

  // Handle marker click events
  const handleMarkerClick = (user, index) => {
    setSelectedUser(user);
    setSelectedMarkerIndex(index);
  };

  // Handle InfoWindow close events
  const handleInfoWindowClose = () => {
    setSelectedUser(null);
    setSelectedMarkerIndex(null);
  };

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          center={center}
          zoom={zoom}
          mapContainerStyle={{ width: "100%", height: "400px" }}
        >
          {postcodes.map((postcode, index) => (
            <Marker
              key={index}
              position={postcode.position}
              title={postcode.title}
              onClick={() => handleMarkerClick(postcode.user, index)}
            />
          ))}

          {selectedMarkerIndex !== null && !loading && (
            <InfoWindow
              position={postcodes[selectedMarkerIndex].position}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <MapsInfoWindow selectedUser={selectedUser} />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
}

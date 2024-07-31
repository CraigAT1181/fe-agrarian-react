import React, { useEffect, useState, useMemo, useCallback } from "react";
import MapsInfoWindow from "./MapsInfoWindow";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

// Load additional libraries for Google Maps
const libraries = ["geometry", "drawing", "places"];

const userMapMarkers = async (postcode, geocoder) => {
  return new Promise((resolve) => {
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
    (latRad(bounds.getNorthEast().lat()) - latRad(bounds.getSouthWest().lat())) /
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

export default function Maps({ users }) {
  const [state, setState] = useState({
    postcodes: [],
    selectedUser: null,
    center: { lat: 0, lng: 0 },
    zoom: 12,
    selectedMarkerIndex: null,
    loading: true,
  });

  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBPEL9RgJfKnr58ff5ZEPSAituv9TMxRXY", // Replace with your actual API key
    libraries,
  });

  const geocoder = useMemo(() => {
    return isLoaded ? new window.google.maps.Geocoder() : null;
  }, [isLoaded]);

  useEffect(() => {
    let isMounted = true;

    async function fetchPostcodes() {
      if (users.length > 0 && geocoder) {
        setState((prevState) => ({ ...prevState, loading: true }));
        try {
          const userPostcodes = await Promise.all(
            users.map(async (user) => {
              const position = await userMapMarkers(user.postcode, geocoder);
              return { position, title: user.postcode, user };
            })
          );

          const validPostcodes = userPostcodes.filter(
            (postcode) => postcode.position
          );

          if (isMounted && validPostcodes.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            validPostcodes.forEach((postcode) => {
              bounds.extend(postcode.position);
            });

            const center = {
              lat:
                (bounds.getSouthWest().lat() + bounds.getNorthEast().lat()) / 2,
              lng:
                (bounds.getSouthWest().lng() + bounds.getNorthEast().lng()) / 2,
            };

            const newZoom = getZoomLevel(bounds, { width: 600, height: 400 });

            setState((prevState) => ({
              ...prevState,
              postcodes: validPostcodes,
              center,
              zoom: newZoom,
              loading: false,
            }));
          }
        } catch (error) {
          console.error("Error fetching postcodes:", error);
          if (isMounted) {
            setState((prevState) => ({
              ...prevState,
              loading: false,
            }));
          }
        }
      } else {
        setState((prevState) => ({
          ...prevState,
          postcodes: [],
          loading: false,
        }));
      }
    }

    fetchPostcodes();

    return () => {
      isMounted = false;
    };
  }, [users, geocoder]);

  const handleMarkerClick = (user, index) => {
    setState((prevState) => ({
      ...prevState,
      selectedUser: user,
      selectedMarkerIndex: index,
    }));
  };

  const handleInfoWindowClose = () => {
    setState((prevState) => ({
      ...prevState,
      selectedUser: null,
      selectedMarkerIndex: null,
    }));
  };

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          center={state.center}
          zoom={state.zoom}
          mapContainerStyle={{ width: "100%", height: "400px" }}
        >
          {state.postcodes.map((postcode, index) => (
            <Marker
              key={index}
              position={postcode.position}
              title={postcode.title}
              onClick={() => handleMarkerClick(postcode.user, index)}
            />
          ))}

          {state.selectedMarkerIndex !== null && !state.loading && (
            <InfoWindow
              position={state.postcodes[state.selectedMarkerIndex].position}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <MapsInfoWindow selectedUser={state.selectedUser} />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
}

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

export default function Maps () {

    return (
      <LoadScript
      googleMapsApiKey="AIzaSyBPEL9RgJfKnr58ff5ZEPSAituv9TMxRXY"
      >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      ></GoogleMap>
      </LoadScript>
    )
}

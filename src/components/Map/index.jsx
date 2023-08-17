import styles from "./style.module.css";
import React, { useCallback, useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_GOOGLE_MAPS,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <MapIn />;
}

function MapIn() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}

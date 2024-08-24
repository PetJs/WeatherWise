import React, { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import CitySearchBar from './dashboard/Weather/CitySearchBar'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useWeatherWiseAppContext from "./dashboard/Weather/useWeatherWiseAppContext";

// Fixing the default marker icon issue
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Updating the default icon for all markers
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapPage() {
  const { selectedCity, weatherData } = useWeatherWiseAppContext();
  const mapRef = useRef<any>(null); // useRef to access the MapContainer

  // Default position if no city is selected or data is missing
  const defaultPosition: [number, number] = [51.505, -0.09]; // Default to London

  // Memoizing cityPosition to avoid unnecessary recalculations
  const cityPosition = useMemo(() => {
    return weatherData.latitude && weatherData.longitude
      ? ([weatherData.latitude, weatherData.longitude] as [number, number])
      : defaultPosition;
  }, [weatherData.latitude, weatherData.longitude]);

  // useEffect to update map center and zoom when weatherData changes
  useEffect(() => {
    if (mapRef.current && weatherData.latitude && weatherData.longitude) {
      const map = mapRef.current;
      map.setView(cityPosition, 13); // Update the map's center and zoom
    }
  }, [cityPosition]); // Now using the memoized cityPosition

  return (
    <div className="map-page">
      <CitySearchBar />
      <h2>{selectedCity || "Map"}</h2>
      <MapContainer
        center={cityPosition}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        whenCreated={(map) => (mapRef.current = map)} // store the map instance
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={cityPosition}>
          <Popup>
            {selectedCity || "A pretty CSS3 popup.<br> Easily customizable."}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapPage;

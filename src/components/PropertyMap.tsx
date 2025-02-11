"use client";

import { useEffect, useState } from "react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "@/components/Spinner";

interface PropertyMapProps {
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
}

const PropertyMap = ({ location }: Readonly<PropertyMapProps>) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_GOOGLE_PUBLIC_GEOCODING_API_KEY,
    language: "en",
    region: "us",
    outputFormat: OutputFormat.JSON,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(`${location.street} ${location.city} ${location.state} ${location.zipcode}`);

        if (res.length === 0) {
          setGeocodeError(true);
          throw new Error("Error occurred on retrieving address info");
        }

        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoords();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (geocodeError) {
    return <div>Could not get lat and lng info</div>;
  }

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_MAPBOX_PUBLIC_TOKEN}
      initialViewState={{ longitude: lng, latitude: lat, zoom: 15 }}
      style={{ width: "100%", height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={lng} latitude={lat}>
        <Image src={pin} alt="location" width={40} height={40} />
      </Marker>
    </Map>
  );
};

export default PropertyMap;

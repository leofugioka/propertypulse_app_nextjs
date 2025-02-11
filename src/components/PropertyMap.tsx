"use client";

import { useState, useEffect } from "react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "@/components/Spinner";

// Move setDefaults outside component
setDefaults({
  key: process.env.NEXT_GOOGLE_PUBLIC_GEOCODING_API_KEY,
  language: "en",
  region: "us",
  outputFormat: OutputFormat.JSON,
});

interface PropertyMapProps {
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
}

interface Coordinates {
  lat: number;
  lng: number;
}

const PropertyMap = ({ location }: Readonly<PropertyMapProps>) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const address = `${location.street} ${location.city} ${location.state} ${location.zipcode}`;
        const res = await fromAddress(address);

        if (res.length === 0) {
          throw new Error("No results found");
        }

        const { lat, lng } = res.results[0].geometry.location;
        setCoordinates({ lat, lng });
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    geocodeAddress();
  }, [location]);

  if (error) {
    return <div>Could not get lat and lng info</div>;
  }

  if (!coordinates) {
    return <Spinner />;
  }

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_MAPBOX_PUBLIC_TOKEN}
      initialViewState={{
        longitude: coordinates.lng,
        latitude: coordinates.lat,
        zoom: 15,
      }}
      style={{ width: "100%", height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={coordinates.lng} latitude={coordinates.lat}>
        <Image src={pin} alt="location" width={40} height={40} />
      </Marker>
    </Map>
  );
};

export default PropertyMap;

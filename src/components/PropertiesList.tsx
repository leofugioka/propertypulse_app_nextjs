"use client";

import PropertyCard from "@/components/PropertyCard";
import { useState } from "react";
import type { Property } from "@prisma/client";

interface PropertiesListProps {
  properties: Property[];
}

const PropertiesList = ({ properties }: Readonly<PropertiesListProps>) => {
  const [selectedRate, setSelectedRate] = useState("monthly");

  const renderedProperties = properties.map((property) => {
    return <PropertyCard key={property.id} property={property} selectedRate={selectedRate} setSelectedRate={setSelectedRate} />;
  });

  return (
    <div className="container-xl lg:container m-auto px-4 py-6">
      {properties.length === 0 ? <p>No properties found</p> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{renderedProperties}</div>}
    </div>
  );
};

export default PropertiesList;

"use client";

import { useState } from "react";
import Link from "next/link";

import PropertyCard from "./PropertyCard";
import type { Property } from "@prisma/client";

interface HomePropertiesListProps {
  properties: Property[];
}

const HomePropertiesList = ({ properties }: Readonly<HomePropertiesListProps>) => {
  const [selectedRate, setSelectedRate] = useState("monthly");

  const renderedProperties = properties
    .filter((property) => property.is_featured === true)
    .map((property) => {
      return <PropertyCard key={property.id.toString()} property={property} selectedRate={selectedRate} setSelectedRate={setSelectedRate} />;
    });

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Properties</h2>
          {properties.length === 0 ? <p>No properties found</p> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{renderedProperties}</div>}
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link href="/properties" className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomePropertiesList;

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarked } from "react-icons/fa";
import { JSX } from "react";

import type { Property } from "@prisma/client";

interface PropertyCardProps {
  property: Property;
  selectedRate: string;
  setSelectedRate: (rate: string) => void;
}

const PropertyCard = ({ property, selectedRate, setSelectedRate }: Readonly<PropertyCardProps>) => {
  const createRenderedRates = () => {
    const jsx: JSX.Element[] = [];
    for (const rate in property.rates) {
      jsx.push(
        <button
          key={rate}
          onClick={() => setSelectedRate(rate.charAt(0) + rate.toLowerCase().split("").slice(1).join("").toLowerCase())}
          className={`flex flex-col items-center cursor-pointer ${selectedRate.toLowerCase() === rate ? "font-bold border-b-2 border-green-900" : ""}`}
        >
          <FaMoneyBill /> {rate.charAt(0).toUpperCase() + rate.toLowerCase().split("").slice(1).join("")}
        </button>
      );
    }
    return jsx;
  };

  const renderedPriceTag = () => {
    switch (selectedRate.toLowerCase()) {
      case "nightly":
        return property.rates["nightly"] ? `$${property.rates["nightly"].toLocaleString("en-US")}/night` : "N/A";
      case "weekly":
        return property.rates["weekly"] ? `$${property.rates["weekly"].toLocaleString("en-US")}/wk` : "N/A";
      default:
        return property.rates["monthly"] ? `$${property.rates["monthly"].toLocaleString("en-US")}/mo` : "N/A";
    }
  };

  return (
    <div className="rounded-xl shadow-md relative">
      <Link href={`/properties/${property.id}`}>
        <Image src={property.images[0]} alt="" className="object-cover w-full h-auto rounded-t-xl" width="0" height="0" sizes="100vw" />
      </Link>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {renderedPriceTag()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed /> {property.beds}
            <span className="md:hidden lg:inline"> Beds</span>
          </p>
          <p>
            <FaBath /> {property.baths}
            <span className="md:hidden lg:inline"> Baths</span>
          </p>
          <p>
            <FaRulerCombined />
            {property.square_feet} <span className="md:hidden lg:inline">ft²</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">{createRenderedRates()}</div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarked className="text-lg text-orange-700" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link href={`/properties/${property.id}`} className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

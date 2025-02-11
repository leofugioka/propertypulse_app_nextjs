import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarked } from "react-icons/fa";
import type { Property } from "@prisma/client";
import { JSX } from "react";

interface PropertyFeaturedCardProps {
  property: Property;
}

export default function PropertyFeaturedCard({ property }: Readonly<PropertyFeaturedCardProps>) {
  const createRenderedRates = () => {
    const jsx: JSX.Element[] = [];
    for (const rate in property.rates) {
      jsx.push(
        <p>
          <FaMoneyBill className="inline-block mr-2" /> {rate.charAt(0).toUpperCase() + rate.toLowerCase().split("").slice(1).join("")}
        </p>
      );
    }
    return jsx;
  };

  const renderPriceTag = () => {
    if (property.rates.monthly) {
      return `${property.rates.monthly.toLocaleString("en-US")}/mo`;
    } else if (property.rates.weekly) {
      return `${property.rates.weekly.toLocaleString("en-US")}/wk`;
    } else if (property.rates.nightly) {
      return `${property.rates.nightly.toLocaleString("en-US")}/night`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
      <Image
        src={property.images[0]}
        alt=""
        className="object-cover w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5"
        width="0"
        height="0"
        sizes="100vw"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold">{property.name}</h3>
        <div className="text-gray-600 mb-4">{property.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">{renderPriceTag()}</h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline-block mr-2" />
            {property.beds}
            <span className="md:hidden lg:inline lg:ml-2">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" />
            {property.baths}
            <span className="md:hidden lg:inline lg:ml-2">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />
            {property.square_feet}
            <span className="md:hidden lg:inline lg:ml-2">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">{createRenderedRates()}</div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarked className="fa-solid fa-location-dot text-lg text-orange-700" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link href={`/properties/${property.id}`} className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm">
            {" "}
            Details{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

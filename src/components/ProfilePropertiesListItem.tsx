"use client";

import Link from "next/link";
import Image from "next/image";
import type { Property } from "@prisma/client";
import * as actions from "@/actions";
import { toast } from "react-toastify";

interface ProfilePropertiesListItemProps {
  property: Property;
}

const ProfilePropertiesListItem = ({ property }: Readonly<ProfilePropertiesListItemProps>) => {
  const handleDeleteClick = async () => {
    await actions.deletePropertyById(property.id);

    toast.success("Property deleted successfully");
  };

  return (
    <div className="mb-10">
      <Link href={`/properties/${property.id}`}>
        <Image className="h-32 w-full rounded-md object-cover" src={property.images[0]} width={0} height={0} sizes="100%" alt="Property 1" />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city}, {property.location.state} {property.location.zipcode}
        </p>
      </div>
      <div className="mt-2 flex gap-2">
        <Link href={`/properties/${property.id}/edit`} className="bg-blue-500 w-24 text-white px-3 py-3 rounded-md hover:bg-blue-600 text-center">
          Edit
        </Link>
        {/* <form onSubmit={handleDeleteSubmit}> */}
        <button type="button" className="bg-red-500 text-white px-3 w-24 py-2 rounded-md hover:bg-red-600 text-center" onClick={handleDeleteClick}>
          Delete
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default ProfilePropertiesListItem;

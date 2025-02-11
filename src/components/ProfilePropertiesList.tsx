import type { Property } from "@prisma/client";
import ProfilePropertiesListItem from "./ProfilePropertiesListItem";

interface ProfilePropertiesListProps {
  properties: Property[];
}

const ProfilePropertiesList = ({ properties }: Readonly<ProfilePropertiesListProps>) => {
  const renderedProperties = properties.map((property) => {
    return <ProfilePropertiesListItem key={property.id} property={property} />;
  });

  return (
    <div className="md:w-3/4 md:pl-4">
      <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
      {renderedProperties}
    </div>
  );
};

export default ProfilePropertiesList;

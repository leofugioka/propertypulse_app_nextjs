import Link from "next/link";
import PropertiesList from "@/components/PropertiesList";
import PropertySearchForm from "@/components/PropertySearchForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import * as queries from "@/queries";

interface PropertySearchPageProps {
  searchParams: Promise<{
    location: string;
    propertyType: string;
  }>;
}

const PropertySearchPage = async ({ searchParams }: Readonly<PropertySearchPageProps>) => {
  const { location, propertyType } = await searchParams;

  const properties = await queries.getPropertiesBySearchForm(location, propertyType);

  let renderedProperties: React.ReactNode;
  if (!properties || properties.length === 0) {
    renderedProperties = <p>No search results</p>;
  } else {
    renderedProperties = <PropertiesList properties={properties} />;
  }
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-autopx-4py-6">
          <Link href="/properties" className="flex items-center text-blue-500 hover:underline mb-3">
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {renderedProperties}
        </div>
      </section>
    </>
  );
};

export default PropertySearchPage;

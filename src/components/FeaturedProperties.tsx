import * as queries from "@/queries";
import PropertyFeaturedCard from "./PropertyFeaturedCard";

const FeaturedProperties = async () => {
  const featuredProperties = await queries.getFeaturedProperties();

  const renderedProperties = featuredProperties?.map((property) => {
    return <PropertyFeaturedCard key={property.id} property={property} />;
  });

  return (
    <section className="bg-blue-50 px-4 py-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{featuredProperties ? renderedProperties : null}</div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

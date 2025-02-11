import PropertyEditForm from "@/components/PropertyEditForm";
import * as queries from "@/queries";

interface PropertyEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

const PropertyEditPage = async ({ params }: Readonly<PropertyEditPageProps>) => {
  const { id } = await params;

  const property = await queries.getPropertyById(id);

  if (!property) {
    throw new Error("Property not found");
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};
export default PropertyEditPage;

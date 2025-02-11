import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import * as queries from "@/queries";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import * as actions from "@/actions";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({ params }: Readonly<PropertyPageProps>) {
  const { id } = await params;
  const property = await queries.getPropertyById(id);
  const isBookmarked = await actions.checkIfBookmarked(id);

  if (!property) {
    return new Response("Property not found", { status: 404 });
  }

  return (
    <>
      {/* Property Header Image */}
      <PropertyHeaderImage propertyImages={property.images} />
      {/* Go Back */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link href="/properties" className="text-blue-500 hover:text-blue-600 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      {/* Property Info */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* Main */}
            <PropertyDetails property={property} />
            {/* Bookmark component */}
            <aside className="space-y-4">
              <BookmarkButton propertyId={property.id} isBookmarked={isBookmarked} />
              <ShareButtons propertyId={property.id} propertyName={property.name} propertyType={property.type} />
              <PropertyContactForm propertyId={property.id} propertyOwner={property.owner} />
            </aside>
          </div>
        </div>
      </section>
      {/* Property Images */}
      <PropertyImages images={property.images} />
    </>
  );
}

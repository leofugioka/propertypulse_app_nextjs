import type { Property } from "@prisma/client";
import PropertiesList from "@/components/PropertiesList";
import * as queries from "@/queries";

const SavedPropertiesPage = async () => {
  const bookmarks = await queries.getBookmarkedProperties();

  let renderedProperties: React.ReactNode;
  if (!bookmarks) {
    renderedProperties = <p>No Properties</p>;
  } else if (bookmarks.length === 0) {
    renderedProperties = <p>No saved properties</p>;
  } else {
    const properties: Property[] = [];

    for (const bookmark of bookmarks) {
      properties.push(bookmark.property);
    }

    renderedProperties = bookmarks.map((bookmark) => {
      return <PropertiesList key={bookmark.id} properties={properties} />;
    });
  }

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {renderedProperties}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;

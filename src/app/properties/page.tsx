import Pagination from "@/components/Pagination";
import PropertiesList from "@/components/PropertiesList";
import * as queries from "@/queries";

interface PropertiesPageProps {
  searchParams: Promise<{
    page: string;
    pageSize: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: Readonly<PropertiesPageProps>) {
  const { page = "1", pageSize = "9" } = await searchParams;

  const skip = (parseInt(page) - 1) * parseInt(pageSize);

  const totalItems = await queries.getPropertiesCount();
  const properties = await queries.getAllProperties(skip, parseInt(pageSize));

  if (!properties) {
    return new Response("Properties not found", { status: 404 });
  }

  return (
    <section className="px-4 py-6">
      <PropertiesList properties={properties} />
      <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={totalItems} />
    </section>
  );
}

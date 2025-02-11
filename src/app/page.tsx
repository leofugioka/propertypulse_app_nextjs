import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import HomePropertiesList from "@/components/HomePropertiesList";
import InfoBoxes from "@/components/InfoBoxes";
import * as queries from "@/queries";
import { notFound } from "next/navigation";

const HomePage = async () => {
  const properties = await queries.getFeaturedProperties();

  if (!properties) {
    return notFound();
  }

  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomePropertiesList properties={properties} />
    </>
  );
};

export default HomePage;

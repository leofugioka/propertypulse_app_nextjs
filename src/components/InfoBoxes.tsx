import InfoBox from "@/components/InfoBox";

export default function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox heading="For Renters" buttonInfo={{ text: "Browse Properties", directTo: "/properties" }}>
            Find your dream rental property. Bookmark properties and contact owners.
          </InfoBox>
          <InfoBox
            heading="For Property Owners"
            buttonInfo={{ text: "Add Property", directTo: "/properties/add" }}
            backgroundColor="bg-blue-100"
            buttonBackgroundColor="bg-blue-500"
            buttonBackgroundHoverColor="bg-blue-600"
          >
            List your properties and reach potential tenants. Rent as an airbnb or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}

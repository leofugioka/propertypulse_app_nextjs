import Image from "next/image";

interface PropertyHeaderImageProps {
  propertyImages: string[];
}

const PropertyHeaderImage = ({ propertyImages }: Readonly<PropertyHeaderImageProps>) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image className="object-cover h-[400px] w-full" src={propertyImages[0]} alt="" width={0} height={0} sizes="100vw" />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;

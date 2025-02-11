"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

interface PropertyImagesProps {
  images: string[];
}

const PropertyImages = ({ images }: Readonly<PropertyImagesProps>) => {
  const renderedImages = images.map((image, index) => {
    return (
      <Item key={image} original={image} thumbnail={image} width="1000" height="600">
        {({ ref, open }) => (
          <Image
            ref={ref}
            onClick={open}
            src={image}
            alt=""
            className={
              ((images.length % 2 !== 0 && (index + 1) % 2 !== 0 && index !== 0) || images.length === 1 ? "col-span-2 " : "") +
              "object-cover h-[400px] mx-auto rounded-xl cursor-pointer"
            }
            width={1800}
            height={400}
            priority={true}
          />
        )}
      </Item>
    );
  });

  return (
    <Gallery>
      <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4">{renderedImages}</div>
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;

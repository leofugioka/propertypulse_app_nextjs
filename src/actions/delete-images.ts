"use server";

import cloudinary from "@/config/cloudinary";

export async function deleteImagesOnPropertyDelete(images: string[]) {
  // Delete Images in Database:
  // 1) Extract public Id
  const imagespublicIDs = images.map((image) => {
    const parts = image.split("/");
    return parts.at(-1)?.split(".").at(0);
  });

  // 2) Delete from Cloudinary
  if (imagespublicIDs.length > 0) {
    for (const publicID of imagespublicIDs) {
      try {
        await cloudinary.uploader.destroy(`propertypulse-dev/${publicID}`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw error;
        } else {
          throw new Error("Could not delete images from Cloudinary");
        }
      }
    }
  }
}

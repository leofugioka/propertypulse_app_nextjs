"use server";

import cloudinary from "@/config/cloudinary";

export async function uploadImagesToCloudinary(images: File[]): Promise<string[]> {
  const imageUrls: string[] = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64
    const imageBase64 = imageData.toString("base64");

    // Make request to cloudinary
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
      folder: "propertypulse-dev",
    });

    imageUrls.push(result.secure_url);
  }

  return imageUrls;
}

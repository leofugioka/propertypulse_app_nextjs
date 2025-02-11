import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_NAME,
  api_key: process.env.NEXT_CLOUDINARY_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_SECRET,
});

export default cloudinary;

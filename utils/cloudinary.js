import cloudinary from "cloudinary";
import env from "dotenv";

env.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Api_Key,
  api_secret: process.env.Api_Secret,
});

export default cloudinary;

import cloudinary from "cloudinary";
import { config } from "../config/app.config";

// configure cloudinary SDK
cloudinary.v2.config({
  cloud_name: config.get("cloudinary.cloudName"),
  api_key: config.get("cloudinary.apiKey"),
  api_secret: config.get("cloudinary.apiSecret")
});

/**
 * Utility to upload image to cloudinary while resizing it
 * @param {Buffer} buffer image buffer
 * @param {object} options
 * @returns {cloudinary.UploadApiResponse}
 */
const uploadImage = async (buffer: Buffer, options = {}): Promise<cloudinary.UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(options, (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      })
      .end(buffer);
  });
};

export { uploadImage };

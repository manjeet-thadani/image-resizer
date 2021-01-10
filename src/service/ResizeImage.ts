import shortid from "shortid";
import to from "await-to-js";
import { UploadApiResponse } from "cloudinary";
import logger from "../logger";
import { DIMENSIONS } from "../constants";
import BadRequest from "../errors/bad-request";
import { uploadImage } from "../utils/upload-image";
import { fetchImageFromURL } from "../utils/fetch-image";

interface IResponse {
  urls: string[];
}

/**
 * Service to handle image resizing request.
 * Fetches image from provided URL and resizes it to specific dimensions
 * Uploads resized images to cloudinary
 */
class ResizeImage {
  private static instance: ResizeImage;

  constructor() {
    if (ResizeImage.instance instanceof ResizeImage) {
      return ResizeImage.instance;
    }
    ResizeImage.instance = this;
  }

  public async execute(url: string): Promise<IResponse> {
    // obtain image buffer from the input URL
    const imageBuffer = await fetchImageFromURL(url);

    // generate unique folder name in which the resized images would be stored
    const folder = shortid.generate();

    const commonOptions = {
      crop: "pad",
      tags: [url, folder]
    };

    // for each dimension upload image to cloudinary
    const promises = DIMENSIONS.map(dimension => {
      return uploadImage(imageBuffer, {
        ...commonOptions,
        folder: `${folder}/${dimension.width}-${dimension.height}`,
        width: dimension.width,
        height: dimension.height
      });
    });

    const [err, uploadResponses] = await to(Promise.all(promises));

    if (err || !uploadResponses) {
      logger.error(`Error uploading images to cloudinary ${err?.message}`);
      throw new BadRequest(`Error occurred while uploading images. ${err?.message}`);
    }

    return this.prepareResponse(uploadResponses);
  }

  private prepareResponse(uploadResponses: UploadApiResponse[]): IResponse {
    const urls = uploadResponses.map(uploadResponse => uploadResponse.url);

    const response: IResponse = { urls };
    return response;
  }
}

export default ResizeImage;

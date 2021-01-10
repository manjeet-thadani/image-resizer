import axios from "axios";
import to from "await-to-js";
import BadRequest from "../errors/bad-request";
import logger from "../logger";

/**
 * Utility to fetch image from provided URL
 * @param {string} url The URL of the image that needs to be fetched
 * @returns {Buffer}
 */
const fetchImageFromURL = async (url: string): Promise<Buffer> => {
  const [err, imageResponse] = await to(axios({ url, responseType: "arraybuffer" }));

  if (err) {
    logger.error(`Error fetching image from url=[${url}], error=[${err.message}]`);
    throw new BadRequest("Unable to fetch image from provided URL");
  }

  const imageHeader = imageResponse?.headers["content-type"].match(/(image)+\//g);
  if (!imageHeader || imageHeader.length === 0) {
    // no match with 'image/'
    logger.error("Provided URL doesn't contain a valid image");
    throw new BadRequest("Provided URL is not a valid image source");
  }

  const buffer = Buffer.from(imageResponse?.data, "binary");
  return buffer;
};

export { fetchImageFromURL };

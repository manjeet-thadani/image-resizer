import Joi from "@hapi/joi";
import { RequestHandler, Request, Response } from "express";
import performRequest from "../../middleware/request-middleware";
import ResizeImage from "../../service/ResizeImage";

const resizeImageSchema = Joi.object().keys({
  body: Joi.object().keys({
    url: Joi.string()
      .uri()
      .required()
  })
});

/**
 * Express controller to handle request to resize image
 * @param {any} req Express Request
 * @param {any} res Express Response
 */
const action: RequestHandler = async (req: Request, res: Response) => {
  const url: string = req.body.url;

  const service = new ResizeImage();
  const response = await service.execute(url);

  res.send({
    message: "Image on the URL has been resized and upload to cloudinary",
    originalURL: url,
    resizedURLs: response.urls
  });
};

const resizeImage = performRequest(action, { validation: resizeImageSchema });

export { resizeImage };

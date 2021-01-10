import Joi from "@hapi/joi";
import { RequestHandler, Request, Response, NextFunction } from "express";

import logger from "../logger";
import BadRequest from "../errors/bad-request";
import { getMessageFromJoiError } from "../utils/joi";

interface IHandlerOptions {
  validation?: Joi.ObjectSchema;
}

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 * @param handler Request handler to check for error
 */
const requestMiddleware = (handler: RequestHandler, options?: IHandlerOptions): RequestHandler => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if any validation schema was provided
  // if yes then validate request against it
  if (options?.validation) {
    const { error } = options?.validation.validate(req, { allowUnknown: true });
    if (error) {
      return next(new BadRequest(getMessageFromJoiError(error)));
    }
  }

  try {
    await handler(req, res, next);
  } catch (err) {
    logger.log({
      level: "error",
      message: "Error in request handler",
      error: err
    });
    return next(err);
  }
};

export default requestMiddleware;

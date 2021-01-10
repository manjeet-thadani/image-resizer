import ApplicationError from "./application-error";

/**
 * Custom error handler to handle BadRequest
 */
export default class BadRequest extends ApplicationError {
  constructor(message?: string) {
    super(message || "Bad request", 400);
  }
}

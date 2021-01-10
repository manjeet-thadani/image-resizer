/**
 * Custom error handler to handle ApplicationError
 */
export default class ApplicationError extends Error {
  public message: string = "ApplicationError";

  public status: number = 500;

  constructor(message?: string, status?: number) {
    super();
    if (message !== null && message !== undefined) {
      this.message = message;
    }
    if (status !== null && status !== undefined) {
      this.status = status;
    }
  }
}

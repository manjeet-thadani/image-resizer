import Joi from "@hapi/joi";

/**
 * Utility to extract message from the Joi Error
 * @param {Joi.ValidationError} error
 * @returns {string | undefined}
 */
const getMessageFromJoiError = (error: Joi.ValidationError): string | undefined => {
  if (!error.details && error.message) {
    return error.message;
  }
  return error.details && error.details.length > 0 && error.details[0].message
    ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}`
    : undefined;
};

export { getMessageFromJoiError };

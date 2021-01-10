/* eslint-disable import/first */
import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: ".env.default" });
}

import app from "./app";
import logger from "./logger";
import { config } from "./config/app.config";

const server = app.listen(app.get("port"), (): void => {
  logger.info(`Express server started at http://localhost:${app.get("port")}`);

  if (config.get("app.env") === "development") {
    logger.info(`Swagger UI hosted at http://localhost:${app.get("port")}/dev/api-docs`);
  }
});

// increase the timeout to x minutes
server.timeout = config.get("timeout");

// Exit process, when receiving SIGINT
process.on("SIGINT", () => {
  logger.info("Gracefully shutting down");
  process.exit(0);
});

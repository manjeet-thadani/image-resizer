import { createLogger, format, transports } from "winston";

const logTransports = [
  new transports.Console({
    level: "debug",
    format: format.prettyPrint()
  })
];

const logger = createLogger({
  format: format.combine(format.timestamp()),
  transports: logTransports,
  defaultMeta: { service: "api" }
});

export default logger;

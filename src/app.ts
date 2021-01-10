import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import express, { Request, Response, NextFunction } from "express";
import ApplicationError from "./errors/application-error";
import routes from "./routes";
import { config } from "./config/app.config";

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", config.get("app.port"));

app.use(routes);

app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || 500).json({
    error: config.get("app.env") === "development" ? err : undefined,
    message: err.message
  });
});

export default app;

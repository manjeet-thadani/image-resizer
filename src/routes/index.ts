import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import v1 from "./v1";
import apiSpec from "../openapi.json";
import { config } from "../config/app.config";

const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};

const router = Router();

router.use("/api/v1", v1);

// Dev routes
if (config.get("app.env") === "development") {
  router.use("/dev/api-docs", swaggerUi.serve);
  router.get("/dev/api-docs", swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;

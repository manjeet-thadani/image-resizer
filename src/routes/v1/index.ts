import { Router } from "express";
import { resizeImage } from "../../controllers/resizer/resize";

const router = Router();

// Resize Image Routes
router.post("/resize", resizeImage);

export default router;

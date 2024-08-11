import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { categoryAddValidator } from "../helpers/categoryValidator.js";
import { addController } from "../controllers/category/allCategory.controller.js";

const router = Router();

router
  .route("/add-category")
  .post(verifyToken, validateRequest(categoryAddValidator), addController);

export default router;

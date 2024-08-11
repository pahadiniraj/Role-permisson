import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { categoryAddValidator } from "../helpers/categoryValidator.js";
import {
  addController,
  getCategories,
} from "../controllers/category/allCategory.controller.js";

const router = Router();

router
  .route("/add-category")
  .post(verifyToken, validateRequest(categoryAddValidator), addController);

router.route("/get-categories").get(verifyToken, getCategories);

export default router;

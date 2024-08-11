import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  categoryAddValidator,
  categoryDeleteValidator,
  categoryUpdateValidator,
} from "../helpers/categoryValidator.js";
import {
  addController,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category/allCategory.controller.js";

const router = Router();

router
  .route("/add-category")
  .post(verifyToken, validateRequest(categoryAddValidator), addController);

router.route("/get-categories").get(verifyToken, getCategories);
router
  .route("/delete-category")
  .post(verifyToken, validateRequest(categoryDeleteValidator), deleteCategory);
router
  .route("/update-category")
  .post(verifyToken, validateRequest(categoryUpdateValidator), updateCategory);
export default router;

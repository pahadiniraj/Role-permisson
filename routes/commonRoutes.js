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
import { createPostValidator } from "../helpers/postValidator.js";
import { createPost } from "../controllers/post/createPost.controller.js";
import { getPost } from "../controllers/post/getPost.controller.js";

const router = Router();

// category routes

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

// post routes

router
  .route("/create-post")
  .post(verifyToken, validateRequest(createPostValidator), createPost);
router.route("/get-posts").get(verifyToken, getPost);

export default router;

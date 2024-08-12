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
import {
  createPostValidator,
  deletePostValidator,
  updatePostValidator,
} from "../helpers/postValidator.js";
import { createPost } from "../controllers/post/post.controller.js";
import { getPost } from "../controllers/post/getPost.controller.js";
import { deletePost } from "../controllers/post/deletePost.controller.js";
import { updatePost } from "../controllers/post/updatePost.controller.js";
import { createUserSchema } from "../helpers/createUserValidator.js";
import { createUser } from "../controllers/user/createUser.controller.js";

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
router
  .route("/delete-post")
  .post(verifyToken, validateRequest(deletePostValidator), deletePost);

router
  .route("/update-post")
  .post(verifyToken, validateRequest(updatePostValidator), updatePost);

// create user

router
  .route("/create-user")
  .post(verifyToken, validateRequest(createUserSchema), createUser);

export default router;

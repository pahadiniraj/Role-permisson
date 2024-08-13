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
  postLikeCountValidator,
  postLikeUnlikeValidator,
  updatePostValidator,
} from "../helpers/postValidator.js";
import { createPost } from "../controllers/post/post.controller.js";
import { getPost } from "../controllers/post/getPost.controller.js";
import { deletePost } from "../controllers/post/deletePost.controller.js";
import { updatePost } from "../controllers/post/updatePost.controller.js";
import {
  createUserSchema,
  deleteUserValidator,
  updateUserValidator,
} from "../helpers/UserValidator.js";
import { createUser } from "../controllers/user/createUser.controller.js";
import { getUsers } from "../controllers/user/getUsers.controller.js";
import { updateUser } from "../controllers/user/updateUser.controller.js";
import { deleteUser } from "../controllers/user/deleteUser.controller.js";
import { postLike } from "../controllers/like/like.controller.js";
import { postUnlike } from "../controllers/like/unlike.controller.js";
import { postLikeCount } from "../controllers/post/postLikeCount.controller.js";

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

router.route("/get-users").get(verifyToken, getUsers);
router
  .route("/update-user")
  .post(verifyToken, validateRequest(updateUserValidator), updateUser);

router
  .route("/delete-user")
  .post(verifyToken, validateRequest(deleteUserValidator), deleteUser);

// like and unlike routes

router
  .route("/post-like")
  .post(verifyToken, validateRequest(postLikeUnlikeValidator), postLike);
router
  .route("/post-unlike")
  .post(verifyToken, validateRequest(postLikeUnlikeValidator), postUnlike);
router
  .route("/post-like-count")
  .post(verifyToken, validateRequest(postLikeCountValidator), postLikeCount);

export default router;

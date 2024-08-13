import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  loginSchema,
  registerSchema,
} from "../helpers/registerAndLoginValidator.js";
import { registerUser } from "../controllers/user/register.controller.js";
import { loginUser } from "../controllers/user/login.controller.js";
import { getProfile } from "../controllers/user/getProfile.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { forgetPassword } from "../controllers/passwordReset/forgetPassword.controller.js";
import {
  forgetPasswordValidator,
  resetPasswordValidator,
} from "../helpers/forgetPasswordValidator.js";
import { resetPassword } from "../controllers/passwordReset/resetPassword.controller.js";
const router = Router();

router.route("/register").post(validateRequest(registerSchema), registerUser);
router.route("/login").post(validateRequest(loginSchema), loginUser);
router.route("/profile").get(verifyToken, getProfile);

// forget password

router
  .route("/forget-password")
  .post(validateRequest(forgetPasswordValidator), forgetPassword);

router
  .route("/reset-password/:token")
  .post(validateRequest(resetPasswordValidator), resetPassword);

export default router;

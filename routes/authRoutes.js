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
const router = Router();

router.route("/register").post(validateRequest(registerSchema), registerUser);
router.route("/login").post(validateRequest(loginSchema), loginUser);
router.route("/profile").get(verifyToken, getProfile);
export default router;


import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  permissionAddValidator,
  permissionDeleteValidator,
  permissionUpdateValidator,
} from "../helpers/adminValidator.js";
import { addPermission } from "../controllers/admin/addPermission.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getPermission } from "../controllers/admin/getPermission.controller.js";
import { deletePermission } from "../controllers/admin/deletePermission.controller.js";
import { updatePermission } from "../controllers/admin/updatePermission.controller.js";
const router = Router();

router
  .route("/add-permission")
  .post(verifyToken, validateRequest(permissionAddValidator), addPermission);
router.route("/get-permissions").get(verifyToken, getPermission);
router
  .route("/delete-permissions")
  .post(
    validateRequest(permissionDeleteValidator),
    verifyToken,
    deletePermission
  );
router
  .route("/update-permissions")
  .post(
    validateRequest(permissionUpdateValidator),
    verifyToken,
    updatePermission
  );
export default router;

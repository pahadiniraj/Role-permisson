import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  permissionAddValidator,
  permissionDeleteValidator,
  permissionUpdateValidator,
  storeRoleValidator,
} from "../helpers/adminValidator.js";
import { addPermission } from "../controllers/admin/addPermission.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getPermission } from "../controllers/admin/getPermission.controller.js";
import { deletePermission } from "../controllers/admin/deletePermission.controller.js";
import { updatePermission } from "../controllers/admin/updatePermission.controller.js";
import { onlyAdminAccess } from "../middlewares/adminMiddleware.js";
import { getRoles, storeRole } from "../controllers/admin/role.controller.js";
const router = Router();

router
  .route("/add-permission")
  .post(
    verifyToken,
    onlyAdminAccess,
    validateRequest(permissionAddValidator),
    addPermission
  );
router
  .route("/get-permissions")
  .get(verifyToken, onlyAdminAccess, getPermission);
router
  .route("/delete-permissions")
  .post(
    verifyToken,
    onlyAdminAccess,
    validateRequest(permissionDeleteValidator),
    deletePermission
  );
router
  .route("/update-permissions")
  .post(
    verifyToken,
    onlyAdminAccess,
    validateRequest(permissionUpdateValidator),
    updatePermission
  );

// role routes

router
  .route("/store-role")
  .post(
    verifyToken,
    onlyAdminAccess,
    validateRequest(storeRoleValidator),
    storeRole
  );
router.route("/get-roles").get(verifyToken, onlyAdminAccess, getRoles);

export default router;

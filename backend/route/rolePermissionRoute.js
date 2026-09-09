import express from "express";
const router=express.Router();
import { addRolePermission,getAllRolePermission,getRolePermission,updateRolePermission,deleteRolePermission } from "../controller/rolePermissionController.js";
import{verifyToken} from "../middleware/authMiddleware.js";
import{allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addRolePermission);
router.get("/",verifyToken,getAllRolePermission);
router.get("/:id",verifyToken,getRolePermission);
router.put("/:id",verifyToken,allowRoles("admin"),updateRolePermission);
router.delete("/:id",verifyToken,deleteRolePermission);

export default router;

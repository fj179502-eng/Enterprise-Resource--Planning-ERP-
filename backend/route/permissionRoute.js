import express from "express";
const router=express.Router();
import { addPermission,getAllPermission,getPermission,updatePermission,deletePermission } from "../controller/permissionController.js";
import{verifyToken} from "../middleware/authMiddleware.js";
import{allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addPermission);
router.get("/",verifyToken,getAllPermission);
router.get("/:id",verifyToken,getPermission);
router.put("/:id",verifyToken,allowRoles("admin"),updatePermission);
router.delete("/:id",verifyToken,deletePermission);

export default router;
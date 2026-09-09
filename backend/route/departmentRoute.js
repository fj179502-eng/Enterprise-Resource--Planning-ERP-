import express from "express";
const router=express.Router();
import { addDepartment,getAllDepartment,getDepartment,updateDepartment,deleteDepartment } from "../controller/departmentController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addDepartment);
router.get("/",verifyToken,allowRoles("admin"),getAllDepartment);
router.get("/:id",verifyToken,allowRoles("admin"),getDepartment);
router.put("/:id",verifyToken,allowRoles("admin"),updateDepartment);
router.delete("/:id",verifyToken,allowRoles("admin"),deleteDepartment);

export default router;
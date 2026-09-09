import express from "express";
const router=express.Router();
import { addProject,getAllProject,getProject,updateProject,deleteProject } from "../controller/projectController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addProject);
router.get("/",verifyToken,getAllProject);
router.get("/:id",verifyToken,getProject);
router.put("/:id",verifyToken,allowRoles("admin"),updateProject);
router.delete("/:id",verifyToken,allowRoles("admin"),deleteProject);

export default router;
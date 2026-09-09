import express from "express";
const router=express.Router();
import { addLeaveType,getAllLeaveType,getLeaveType,updateLeaveType,deleteLeaveType } from "../controller/leaveTypeController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addLeaveType);
router.get("/",verifyToken,getAllLeaveType);
router.get("/:id",verifyToken,getLeaveType);
router.put("/:id",verifyToken,allowRoles("admin"),updateLeaveType);
router.delete("/:id",verifyToken,allowRoles("admin"),deleteLeaveType);

export default router;

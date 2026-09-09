import express from "express";
const router=express.Router();
import { addAttendance,getAllAttendance,getAttendance,updateAttendance,deleteAttendance } from "../controller/attendanceController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addAttendance);
router.get("/",verifyToken,getAllAttendance);
router.get("/:id",verifyToken,getAttendance);
router.put("/:id",verifyToken,allowRoles("admin"),updateAttendance);
router.delete("/:id",verifyToken,allowRoles("admin"),deleteAttendance);

export default router;
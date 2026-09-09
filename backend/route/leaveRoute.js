import express from "express";
const router=express.Router();
import { addLeave,getAllLeave,getLeave,updateLeave,deleteLeave } from "../controller/leaveController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,addLeave);
router.get("/",verifyToken,getAllLeave);
router.get("/:id",verifyToken,getLeave);
router.put("/:id",verifyToken,updateLeave);
router.delete("/:id",verifyToken,deleteLeave);

export default router;
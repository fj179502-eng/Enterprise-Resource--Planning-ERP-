import express from "express";
const router=express.Router();
import { addTask,getAllTask,getTask,updateTask,deleteTask } from "../controller/taskController.js";
import{verifyToken} from "../middleware/authMiddleware.js";
import{allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addTask);
router.get("/",verifyToken,getAllTask);
router.get("/:id",verifyToken,getTask);
router.put("/:id",verifyToken,allowRoles("admin"),updateTask);
router.delete("/:id",verifyToken,allowRoles("admin"),deleteTask);

export default router;
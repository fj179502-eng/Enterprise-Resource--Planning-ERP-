import express from "express";
const router=express.Router();
import { addNotification,getAllNotification,getNotification,updateNotification,deleteNotification } from "../controller/notificationController.js";
import{verifyToken} from "../middleware/authMiddleware.js";
import{allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addNotification);
router.get("/",verifyToken,getAllNotification);
router.get("/:id",verifyToken,getNotification);
router.put("/:id",verifyToken,allowRoles("admin"),updateNotification);
router.delete("/:id",verifyToken,deleteNotification);

export default router;
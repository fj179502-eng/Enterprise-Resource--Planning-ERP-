import express from "express";
const router=express.Router();
import { addDesignation,getAllDesignation,getDesignation,updateDesignation,deleteDesignation} from "../controller/designationController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addDesignation);
router.get("/",verifyToken,getAllDesignation);
router.get("/:id",verifyToken,getDesignation);
router.put("/:id",verifyToken,allowRoles("admin"),updateDesignation);
router.delete("/:id",verifyToken,allowRoles("admin"),deleteDesignation);

export default router;
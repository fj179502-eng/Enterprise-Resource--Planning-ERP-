import express from "express";
const router=express.Router();
import { addEmployee,getAllEmployee,getEmployee,updateEmployee,deleteEmployee } from "../controller/employeeController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addEmployee);
router.get("/",verifyToken,getAllEmployee);
router.get("/:id",verifyToken,getEmployee);
router.put("/:id",verifyToken,updateEmployee);
router.delete("/:id",verifyToken,allowRoles("admin"),deleteEmployee);

export default router;
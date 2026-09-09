import express from "express";
const router=express.Router();
import { addPayroll,getAllPayroll,getPayroll,updatePayroll,deletePayroll } from "../controller/payrollController.js";
import{verifyToken} from "../middleware/authMiddleware.js";
import{allowRoles} from "../middleware/rolesMiddleware.js";

router.post("/",verifyToken,allowRoles("admin"),addPayroll);
router.get("/",verifyToken,getAllPayroll);
router.get("/:id",verifyToken,getPayroll);
router.put("/:id",verifyToken,allowRoles("admin"),updatePayroll);
router.delete("/:id",verifyToken,allowRoles("admin"),deletePayroll);

export default router;
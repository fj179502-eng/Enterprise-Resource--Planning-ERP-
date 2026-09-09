import express from "express";
const router = express.Router();
import { register, login, getAllUser, getUser } from "../controller/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

router.post("/register", upload.single("profile_image"), register);
router.post("/login", login);
router.get("/users", verifyToken, getAllUser);
router.get("/user", verifyToken, getUser);

export default router;
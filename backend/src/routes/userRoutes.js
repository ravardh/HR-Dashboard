import express from "express";
import { userProfile, updateUserProfile } from "../controller/userController.js";
import { userProtect } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/profile", userProtect, userProfile);

router.put("/profile", userProtect, updateUserProfile);

export default router;
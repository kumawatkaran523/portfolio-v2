import express from "express";
import {
  createAbout,
  getAbout,
  login,
  updateAbout,
  createAdmin,
} from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/setup", createAdmin); // One-time setup
router.get("/about", getAbout);
router.post("/about", authMiddleware, createAbout);
router.put("/about", authMiddleware, updateAbout);

export default router;

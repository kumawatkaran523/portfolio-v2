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

// Admin login
router.post("/login", login);

// Create admin (one-time setup)
router.post("/setup", createAdmin);

// Get about (public)
router.get("/about", getAbout);

// Create about (protected)
router.post("/about", authMiddleware, createAbout);

// Update about (protected)
router.put("/about", authMiddleware, updateAbout);

export default router;

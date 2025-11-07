import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogBySlug,
  getBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get all blogs (with pagination, search, etc)
router.get("/", getBlogs);

// Create new blog (protected)
router.post("/createBlog", authMiddleware, createBlog);

// Get blog by slug
router.get("/:slug", getBlogBySlug);

// Update blog (protected)
router.put("/:slug", authMiddleware, updateBlog);

// Delete blog (protected)
router.delete("/:id", authMiddleware, deleteBlog);

export default router;

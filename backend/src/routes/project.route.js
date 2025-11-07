import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../controllers/project.controller.js";

const router = express.Router();

// Get all projects
router.get("/", getAllProjects);

// Add new project (protected)
router.post("/", authMiddleware, addProject);

// Get single project
router.get("/:id", getProjectById);

// Update project (protected)
router.put("/:id", authMiddleware, updateProject);

// Delete project (protected)
router.delete("/:id", authMiddleware, deleteProject);

export default router;

import express from "express";
import {
  sendmail,
  getAllContacts,
  markAsRead,
} from "../controllers/contact.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Send message (public)
router.post("/", sendmail);

// Get all contacts (protected - admin only)
router.get("/", authMiddleware, getAllContacts);

// Mark as read (protected)
router.put("/:id/read", authMiddleware, markAsRead);

export default router;

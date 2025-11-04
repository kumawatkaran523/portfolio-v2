import express from "express";
import {
  sendmail,
  getAllContacts,
  markAsRead,
} from "../controllers/contact.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", sendmail);
router.get("/", authMiddleware, getAllContacts);
router.put("/:id/read", authMiddleware, markAsRead);

export default router;

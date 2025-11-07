import express from "express";
import {
  sendmail,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", sendmail);

export default router;

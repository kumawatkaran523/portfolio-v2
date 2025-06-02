import express from 'express'
import { createAbout, getBlogs, login, updateAbout } from '../controllers/admin.controller.js';

const router=express.Router();

router.post("/login", login);
router.get("/getBlogs", getBlogs);
router.post("/createAbout",createAbout)
router.post("/updateAbout",updateAbout);
export default router;
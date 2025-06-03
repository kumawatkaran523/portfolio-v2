import express from 'express'
import {  createAbout, getAbout, login, updateAbout } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router=express.Router();

router.post("/login", login);
router.get('/about',getAbout);
router.post("/createAbout",authMiddleware,createAbout);
router.post("/updateAbout",authMiddleware,updateAbout);

export default router;
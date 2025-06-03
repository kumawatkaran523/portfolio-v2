import express from 'express'
import { addProject, createAbout, createBlog, getBlogs, login, updateAbout } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router=express.Router();

router.post("/login", login);
router.get("/getBlogs", getBlogs);
router.post("/createAbout",authMiddleware,createAbout);
router.post("/updateAbout",authMiddleware,updateAbout);
router.post('/createBlog',authMiddleware,createBlog);
router.post('/addProject',authMiddleware,addProject);
export default router;
import express from 'express'
import { addProject, createAbout, createBlog, getBlogs, login, updateAbout } from '../controllers/admin.controller.js';

const router=express.Router();

router.post("/login", login);
router.get("/getBlogs", getBlogs);
router.post("/createAbout",createAbout);
router.post("/updateAbout",updateAbout);
router.post('/createBlog',createBlog);
router.post('/addProject',addProject)
export default router;
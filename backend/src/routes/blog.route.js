import express from 'express';
import { createBlog, deleteBlog, getBlogBySlug, getBlogs, updateBlog } from '../controllers/blog.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router =express.Router();

router.get('/',getBlogs);
router.get('/:slug',getBlogBySlug);
router.post('/createBlog',authMiddleware,createBlog);
router.delete('/deleteBlog/:id',authMiddleware,deleteBlog);
router.put("/updateBlog/:slug", authMiddleware, updateBlog);
export default router;

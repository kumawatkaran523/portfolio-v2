import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { addProject, deleteProject, getAllProjects } from '../controllers/project.controller.js';

const router=express.Router();

router.get('/',getAllProjects);
router.post('/addProject',authMiddleware,addProject);
router.delete('/:id',authMiddleware,deleteProject);

 
export default router;
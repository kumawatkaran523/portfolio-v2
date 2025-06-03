import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware';
import { addProject, deleteProject, getAllProjects } from '../controllers/project.controller';

const router=express.Router();

router.get('/allProject',getAllProjects);
router.post('/addProject',authMiddleware,addProject);
router.delete('/deleteProject/:id',authMiddleware,deleteProject);

 
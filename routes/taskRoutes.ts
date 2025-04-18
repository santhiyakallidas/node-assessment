import express, { Router } from 'express';
import { addTask,getTasks } from '../controller/taskController';

const router:Router = express.Router();

router.post('/add',addTask);
router.get('/',getTasks);

export default router
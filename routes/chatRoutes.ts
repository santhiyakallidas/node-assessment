import express, { Router } from 'express';
import { importChart } from '../controller/chatController';
import { upload } from '../middleware/upload';

const router:Router = express.Router();

router.post('/import',upload.single('file'),importChart);

export default router
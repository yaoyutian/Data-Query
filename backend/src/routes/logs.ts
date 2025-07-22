import { Router } from 'express';
import { LogController } from '../controllers/log.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.post('/record', authMiddleware, LogController.record);
router.get('/query', authMiddleware, LogController.query);
export default router;

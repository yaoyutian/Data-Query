import { Router } from 'express';
import axios from 'axios';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const PYTHON_TRAINING_API = process.env.PYTHON_TRAINING_API || 'http://localhost:8000';

// 启动训练
router.post('/start', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.post(`${PYTHON_TRAINING_API}/training/start`, req.body);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
// 查询训练状态
router.get('/status/:jobId', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.get(`${PYTHON_TRAINING_API}/training/status/${req.params.jobId}`);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
// 停止训练
router.post('/stop/:jobId', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.post(`${PYTHON_TRAINING_API}/training/stop/${req.params.jobId}`);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
// 获取训练日志
router.get('/logs/:jobId', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.get(`${PYTHON_TRAINING_API}/training/logs/${req.params.jobId}`);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
export default router;

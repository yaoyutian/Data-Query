import { Router } from 'express';
import axios from 'axios';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const PYTHON_EVAL_API = process.env.PYTHON_EVAL_API || 'http://localhost:8000';

// 对话评测
router.post('/dialog', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.post(`${PYTHON_EVAL_API}/evaluation/dialog`, req.body);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
// 性能评测
router.post('/metrics', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.post(`${PYTHON_EVAL_API}/evaluation/metrics`, req.body);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
// 评测报告
router.get('/report/:jobId', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.get(`${PYTHON_EVAL_API}/evaluation/report/${req.params.jobId}`);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
export default router;

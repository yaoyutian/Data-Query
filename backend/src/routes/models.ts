import { Router } from 'express';
import axios from 'axios';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const PYTHON_MODEL_API = process.env.PYTHON_MODEL_API || 'http://localhost:8000';

// 部署模型
router.post('/deploy', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.post(`${PYTHON_MODEL_API}/models/deploy`, req.body);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
// 推理
router.post('/:modelId/generate', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.post(`${PYTHON_MODEL_API}/models/${req.params.modelId}/generate`, req.body);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
// 获取模型信息
router.get('/:modelId/info', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.get(`${PYTHON_MODEL_API}/models/${req.params.modelId}/info`);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
// 删除模型
router.delete('/:modelId', authMiddleware, async (req, res) => {
  try {
    const resp = await axios.delete(`${PYTHON_MODEL_API}/models/${req.params.modelId}`);
    res.json(resp.data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});
export default router;

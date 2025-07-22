import express, { Request, Response } from 'express';

const router = express.Router();

// 标签列表
router.get('/', (req: Request, res: Response) => {
  // TODO: 查询标签
  res.json([{ id: 1, name: '示例标签' }]);
});

// 新增标签
router.post('/', (req: Request, res: Response) => {
  // TODO: 新增标签
  res.json({ id: 2, name: req.body.name });
});

export default router;

import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// 用户注册
router.post('/register', async (req: Request, res: Response) => {
  // TODO: 实现注册逻辑
  res.json({ message: '注册成功' });
});

// 用户登录
router.post('/login', async (req: Request, res: Response) => {
  // TODO: 实现登录逻辑
  res.json({ token: 'mock-jwt-token' });
});

export default router;

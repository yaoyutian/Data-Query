import express ,{ Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'winston';
import dotenv from 'dotenv';
import path from 'path';
import authRouter from './routes/auth';
import documentsRouter from './routes/documents';
import tagsRouter from './routes/tags';

// 加载环境变量
dotenv.config();

const app: Application = express();

// 日志配置
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));

// 静态资源
app.use(express.static(path.join(process.cwd(), 'public')));

// 路由
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date() });
});

app.use('/api/auth', authRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/tags', tagsRouter);

// 错误处理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// 文件存储配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// 上传文档接口
router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  // TODO: 保存文件信息到数据库，处理标签
  res.json({ filename: req.file?.filename, originalname: req.file?.originalname });
});

export default router;

import { Request, Response } from 'express';
import { DataService } from '../services/data.service';

const dataService = new DataService();

export class DataController {
  static async upload(req: Request, res: Response) {
    // 文件已由multer处理，req.file/req.files
    const file = req.file;
    if (!file) return res.status(400).json({ message: '未上传文件' });
    const doc = await dataService.saveFile(file, (req as any).user?.id);
    res.json(doc);
  }

  static async extract(req: Request, res: Response) {
    const { documentId } = req.body;
    const result = await dataService.extractText(documentId);
    res.json(result);
  }

  static async exportMarkdown(req: Request, res: Response) {
    const { documentId } = req.body;
    const md = await dataService.exportMarkdown(documentId);
    res.json({ markdown: md });
  }

  static async list(req: Request, res: Response) {
    const docs = await dataService.listDocuments((req as any).user?.id);
    res.json(docs);
  }
}

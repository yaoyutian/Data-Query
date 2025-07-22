import { Request, Response } from 'express';
import { LogService } from '../services/log.service';

const logService = new LogService();

export class LogController {
  static async record(req: Request, res: Response) {
    const { action, detail } = req.body;
    const userId = (req as any).user?.id;
    const log = await logService.record(userId, action, detail);
    res.json(log);
  }

  static async query(req: Request, res: Response) {
    const { userId, action, from, to } = req.query;
    const logs = await logService.query({
      userId: userId as string,
      action: action as string,
      from: from ? new Date(from as string) : undefined,
      to: to ? new Date(to as string) : undefined,
    });
    res.json(logs);
  }
}

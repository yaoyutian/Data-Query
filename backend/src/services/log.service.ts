import { getRepository } from 'typeorm';
import { Log } from '../models/log.entity';

export class LogService {
  private logRepo = getRepository(Log);

  async record(userId: string, action: string, detail?: string) {
    const log = this.logRepo.create({ userId, action, detail });
    return this.logRepo.save(log);
  }

  async query(params: { userId?: string; action?: string; from?: Date; to?: Date }) {
    const qb = this.logRepo.createQueryBuilder('log');
    if (params.userId) qb.andWhere('log.userId = :userId', { userId: params.userId });
    if (params.action) qb.andWhere('log.action = :action', { action: params.action });
    if (params.from) qb.andWhere('log.createdAt >= :from', { from: params.from });
    if (params.to) qb.andWhere('log.createdAt <= :to', { to: params.to });
    return qb.orderBy('log.createdAt', 'DESC').getMany();
  }
}

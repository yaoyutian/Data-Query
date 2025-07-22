import { getRepository } from 'typeorm';
import { User } from '../models/user.entity';
import bcrypt from 'bcryptjs';

export class UserService {
  private userRepo = getRepository(User);

  async register(email: string, password: string, role: string = 'user') {
    const exist = await this.userRepo.findOne({ where: { email } });
    if (exist) throw new Error('邮箱已注册');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ email, passwordHash, role });
    return this.userRepo.save(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.passwordHash);
    return valid ? user : null;
  }

  async findById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async updateProfile(id: string, profile: any) {
    await this.userRepo.update(id, { profile });
    return this.findById(id);
  }
}

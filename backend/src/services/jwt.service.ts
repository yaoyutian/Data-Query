import jwt from 'jsonwebtoken';
import { User } from '../models/user.entity';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const EXPIRES_IN = '7d';

export class JwtService {
  static sign(user: User) {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: EXPIRES_IN });
  }
  static verify(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}

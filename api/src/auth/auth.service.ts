import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';
import { PrismaService } from '../prisma.service';

const JWT_SECRET = 'secret';
const COOKIE_NAME = 'jwt';

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(body: any, res: Response) {
    const result = registerSchema.safeParse(body);
    if (!result.success) return res.status(400).json(result.error.format());

    const { name, email, password } = result.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return res.json({ id: user.id, email: user.email });
  }

  async login(body: any, res: Response) {
    const result = loginSchema.safeParse(body);
    if (!result.success) return res.status(400).json(result.error.format());

    const { email, password } = result.data;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.json({ message: 'Logged in' });
  }

  logout(res: Response) {
    res.clearCookie(COOKIE_NAME);
    return res.json({ message: 'Logged out' });
  }
}

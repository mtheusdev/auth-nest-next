import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AuthGuard],
})
export class AuthModule {}

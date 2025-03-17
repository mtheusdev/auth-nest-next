import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any, @Res() res: Response) {
    return this.authService.register(body, res);
  }

  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    return this.authService.login(body, res);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  getUser(@Req() req: Request & { user: any }) {
    return req.user;
  }
}

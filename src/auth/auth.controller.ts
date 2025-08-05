// backend/src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const res = await this.authService.validateUser(body.email, body.password);
    if (!res) throw new UnauthorizedException('Identifiants invalides');
    return res;
  }
}

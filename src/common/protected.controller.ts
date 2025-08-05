import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ProtectedController {
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  getAdmin(@Request() req) {
    return { message: '✅ Accès autorisé à l\'admin' };
  }
}

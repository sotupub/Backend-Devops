import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getAdminPage(@Req() req) {
    return { message: `Bienvenue ${req.user.username} 🎉✨` };
  }
}

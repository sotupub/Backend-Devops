import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserService } from './user/user.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    if (!adminEmail) {
      throw new Error('ADMIN_EMAIL is not defined in .env');
    }
    const existingAdmin = await this.userService.findByEmail(adminEmail);
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(
        this.configService.get<string>('ADMIN_PASSWORD') || 'admin123',
        10,
      );
      await this.userService.create({
        username: this.configService.get<string>('ADMIN_USERNAME') || 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin créé automatiquement');
    } else {
      console.log('Admin déjà existant');
    }
  }
}

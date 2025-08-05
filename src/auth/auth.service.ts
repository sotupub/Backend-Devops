// backend/src/auth/auth.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    const admin = await this.userModel.findOne({ role: 'admin' });
    if (!admin) {
      const hashed = await bcrypt.hash('admin123', 10);
      await this.userModel.create({
        username: 'admin',
        email: 'admin@example.com',
        password: hashed,
        role: 'admin',
      });
      console.log('✅ Admin créé automatiquement');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}

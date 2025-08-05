import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async onModuleInit() {
    const adminExists = await this.userModel.findOne({ role: 'admin' }).exec();
    if (!adminExists) {
      const hashed = await bcrypt.hash('admin123', 10);
      await this.userModel.create({
        username: 'admin',
        email: 'admin@example.com',
        password: hashed,
        role: 'admin',
      });
      console.log('Admin user created successfully');
    }
  }
}
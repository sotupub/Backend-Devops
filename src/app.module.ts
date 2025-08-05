// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProtectedController } from './common/protected.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest_auth'),
    AuthModule,
    UserModule,
  ],
  controllers: [ProtectedController], 
})
export class AppModule {}

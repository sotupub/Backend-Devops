import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,
  });

  await app.listen(3001);
  console.log('🚀 Server ready at http://localhost:3001');
}
bootstrap();

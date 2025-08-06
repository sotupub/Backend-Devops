import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration CORS
  app.enableCors({
    origin: 'http://localhost:3001', // URL de votre frontend
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('Application lancée sur http://localhost:3000');
}
bootstrap();
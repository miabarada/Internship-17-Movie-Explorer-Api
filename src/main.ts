import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config(); 

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('JWT', process.env.JWT_SECRET);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movie explorer API')
    .setDescription("Movie explorer API docs")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

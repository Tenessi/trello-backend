import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:5000'],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })

  const config = new DocumentBuilder()
    .setTitle('Trello Krots')
    .setDescription('The Trello Krots API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}

bootstrap();

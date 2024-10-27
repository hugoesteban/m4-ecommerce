import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Proyecto Integrador M4-Back - Hugo Agüero')
    .setDescription('Aplicación creada con Nest JS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(new LoggerMiddleware().use);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();

  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Kupi-podari-day')
    .setDescription('Education project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const port = configService.get<number>('API_PORT');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(port || 3001, () => {
    console.log('Сервер запущен');
  });
}
bootstrap();

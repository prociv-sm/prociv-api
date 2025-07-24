import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalFilters(new HttpExceptionFilter());
  const configService = app.get(ConfigService);

  // Swagger setup
  const options = new DocumentBuilder()
    .setTitle('PCSM - Alert and Management API')
    .setDescription('API documentation for the PCSM Alert and Management system')
    .setVersion(process?.env?.npm_package_version || '1.0.0')
    .setContact('Andrea Tombolato', 'https://heyatom.dev', 'hey@heyatom.dev')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  app.enableCors({
    origin: '*',
  });
  app.use(helmet());

  const appPort = configService.get('APP_PORT') || 8080;
  await app.listen(appPort);

  Logger.log('App is running and is listening at: http://localhost:' + appPort);
}
bootstrap();

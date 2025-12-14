import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.setGlobalPrefix('api');
console.log("🔥 Global Prefix:", app.getHttpAdapter().getInstance()._globalPrefix);


  await app.listen(process.env.PORT || 3000);
}
bootstrap();

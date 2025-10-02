import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Nomina-Service');
  
  // Configuración para Puppeteer en producción
  if (process.env.NODE_ENV === 'production') {
    process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = 'true';
    process.env.PUPPETEER_EXECUTABLE_PATH = '/usr/bin/chromium-browser';
  }
  
  const app = await NestFactory.create(AppModule);

  // Configuración para trabajar con Gateway
  app.enableCors({
    origin: [
      'http://localhost:3000', // Gateway
      'http://localhost:3001', // Frontend dev
      'http://localhost:8080', // Frontend prod
      process.env.FRONTEND_URL, // Frontend en producción
      process.env.GATEWAY_URL,  // Gateway en producción
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-User-Id',     // Header personalizado del Gateway
      'X-User-Role',   // Header personalizado del Gateway
      'X-User-Name',   // Header personalizado del Gateway
      'X-User-Email',  // Header personalizado del Gateway
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Configurar prefijo global para todas las rutas
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 3005;
  await app.listen(port);
  logger.log(`🚀 Nomina Microservice running on: http://localhost:${port}`);
  logger.log(`📊 Ready to receive requests from Gateway`);
}
bootstrap();

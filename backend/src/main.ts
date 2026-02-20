import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set API prefix
  app.setGlobalPrefix('api');

  // Enable CORS for frontend
  const allowedOrigins = [
    'http://localhost:3000', 'http://localhost:3002', // Manch local
    'http://localhost:3001', 'http://localhost:3003', // Prasaran local
    'http://localhost:3100', 'http://localhost:3102', // Adda local
    'http://localhost:3200', 'http://localhost:3202', // Samooh local
  ];

  // Add production frontend URLs from environment or common Vercel patterns
  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl) {
    allowedOrigins.push(frontendUrl);
  }

  // Add Vercel preview and production URLs
  if (process.env.NODE_ENV === 'production') {
    allowedOrigins.push(
      /https:\/\/manch-.*\.vercel\.app$/,
      /https:\/\/.*\.vercel\.app$/
    );
  }

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      // Check if origin is allowed
      const isAllowed = allowedOrigins.some(allowed => {
        if (typeof allowed === 'string') return allowed === origin;
        if (allowed instanceof RegExp) return allowed.test(origin);
        return false;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log('Blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Manch backend running on http://localhost:${port}`);
}

bootstrap();

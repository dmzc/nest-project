import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('/api');
  //启用session
  app.use(
    session({
      secret: 'zhang123',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useStaticAssets('public', { prefix: '/static' });
  await app.listen(3001);
}
bootstrap();

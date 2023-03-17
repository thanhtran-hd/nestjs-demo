import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('SERVER_PORT', 3000);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port, () => {
    Logger.log(`Listen at port ${port}`, 'Server');
  });
}

bootstrap();

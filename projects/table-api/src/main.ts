import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const host = configService.get('SERVER_HOST');
  const port = configService.get('SERVER_PORT');
  await app.listen(port, host, () => {});

  console.log(`🚀 启动成功: http://${host}:${port}`);
}
bootstrap();

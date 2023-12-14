import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * npm run start:repl
 * npm run start:dev -- --entryFile repl
 * nest start --watch --entryFile repl
 */
async function bootstrap() {
  const replServer = await repl(AppModule);
  replServer.setupHistory('.tmp/.nestjs_repl_history', (err) => {
    if (err) {
      console.error(err);
    }
  });
}

bootstrap();

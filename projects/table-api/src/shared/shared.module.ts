import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createClient } from 'redis';
import { SharedService } from './shared.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('MYSQL_SERVER_HOST'),
          port: configService.get('MYSQL_SERVER_PORT'),
          username: configService.get('MYSQL_SERVER_USERNAME'),
          password: configService.get('MYSQL_SERVER_PASSWORD'),
          database: configService.get('MYSQL_SERVER_DATABASE'),
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
          // entities: [User, Role, Permission],
          // poolSize: 10,
          // connectorPackage: 'mysql2',
          // extra: {
          //   authPlugin: 'sha256_password',
          // },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    SharedService,
    RedisService,
    {
      inject: [ConfigService],
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = createClient({
          socket: {
            host: configService.get('REDIS_SERVER_HOST'),
            port: configService.get('REDIS_SERVER_PORT'),
          },
          database: configService.get('REDIS_SERVER_DB'),
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [SharedService, RedisService],
})
export class SharedModule {}

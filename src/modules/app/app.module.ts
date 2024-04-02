import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from '../../configs/config.schema';
import V1Module from '../v1/v1.module';
import { RolesGuard } from '../v1/roles/guards/roles.guard';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: configValidationSchema,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          username: configService.get('REDIS_USERNAME'),
          password: configService.get('REDIS_PASSWORD'),
        },
        defaultJobOptions: {
          removeOnComplete: true,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: RolesGuard }],
})
export class AppModule {}

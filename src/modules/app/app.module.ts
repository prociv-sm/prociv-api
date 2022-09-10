import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from '../../configs/config.schema';
import V1Module from '../v1/v1.module';
import { RolesGuard } from '../v1/roles/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME || 'prociv',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: 'APP_GUARD', useClass: RolesGuard }],
})
export class AppModule {}

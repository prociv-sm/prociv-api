import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './schemas/alert.entity';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { AlertsConsumer } from './alerts.consumer';
import { AlertsProducerService } from './alerts.producer.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'alerts',
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    }),
    TypeOrmModule.forFeature([Alert]),
  ],
  controllers: [AlertsController],
  providers: [AlertsService, AlertsConsumer, AlertsProducerService],
})
export class AlertsModule {}

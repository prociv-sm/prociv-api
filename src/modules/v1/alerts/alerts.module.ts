import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './schemas/alert.entity';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { AlertsConsumer } from './alerts.consumer';
import { AlertsProducerService } from './alerts.producer.service';
import { BullModule } from '@nestjs/bull';
import { SectorsModule } from '../sector/sectors.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'alerts',
      defaultJobOptions: {
        removeOnComplete: true,
      },
    }),
    TypeOrmModule.forFeature([Alert]),
    SectorsModule,
  ],
  providers: [AlertsService, AlertsConsumer, AlertsProducerService],
  controllers: [AlertsController],
})
export class AlertsModule {}

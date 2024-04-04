import { Module } from '@nestjs/common';
import { AlertsController } from './alerts.controller';
import { HttpModule } from '@nestjs/axios';
import { AlertsService } from './alerts.service';

@Module({
  imports: [HttpModule],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}

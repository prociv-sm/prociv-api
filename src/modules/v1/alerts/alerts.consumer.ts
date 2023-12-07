import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Alert } from './schemas/alert.entity';
import { AlertsService } from './alerts.service';
import { Logger } from '@nestjs/common';

@Processor('alerts-queue')
export class AlertsConsumer {
  constructor(private readonly alertsService: AlertsService) {}

  private readonly logger = new Logger(AlertsConsumer.name);

  @Process('alerts-job')
  async createNewAlerts(job: Job<Alert>) {
    const { data } = job;
    this.logger.log(`Incoming on alerts queue: ${JSON.stringify(data)}`);
    // Find if alert already exists
    const alert = await this.alertsService.findByLocationIdentifierAndType(
      data.location_code,
      data.identifier,
      data.type,
    );
    if (alert) {
      this.logger.log(
        `Alert already exists with id ${alert.id}, updating with new data`,
      );
      await this.alertsService.update(alert.id, data);
      return;
    }

    await this.alertsService.create(data);
  }
}

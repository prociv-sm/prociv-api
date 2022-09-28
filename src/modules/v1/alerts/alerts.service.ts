import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Alert } from './schemas/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import * as fs from 'fs';

@Injectable()
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);

  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
  ) {}

  findAll(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  async create(data: CreateAlertDto): Promise<Alert> {
    const alert = this.alertRepository.create(data);
    await this.alertRepository.save(data);
    return alert;
  }

  findByLocation(location: string): Promise<Alert[]> {
    return this.alertRepository.find({
      where: {
        location_code: location,
      },
    });
  }

  findByLocationAndType(location: string, type: string): Promise<Alert | null> {
    return this.alertRepository.findOne({
      where: {
        location_code: location,
        type: type,
      },
    });
  }

  delete(id: string): Promise<any> {
    return this.alertRepository.delete(id);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async removeExpiredAlerts() {
    this.logger.log('Removing all expired alerts');
    const currentDate = new Date();
    const deletedAlerts = await this.alertRepository.delete({
      expires: LessThanOrEqual(currentDate),
    });
    this.logger.log(`Deleted ${deletedAlerts.affected} expired alerts`);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async findNewAlerts() {
    this.logger.log('Checking for new alerts');
    fs.readFile(`./submissions/alerts.json`, 'utf8', async (err, data) => {
      if (err) {
        this.logger.error(err);
        return;
      }
      const alerts = JSON.parse(data);
      for (const alert of alerts) {
        const alertExists = await this.alertRepository.findOne({
          where: {
            identifier: alert.identifier,
            location_code: alert.location_code,
            type: alert.type,
          },
        });
        if (!alertExists) {
          this.logger.log(
            `New alert found for area: ${alert.location_code} with type: ${alert.type}`,
          );
          await this.create(alert);
        }
      }
    });
  }
}

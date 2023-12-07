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

  findByLocationIdentifierAndType(
    location: string,
    identifier: string,
    type: string,
  ): Promise<Alert | null> {
    return this.alertRepository.findOne({
      where: {
        location_code: location,
        identifier: identifier,
        type: type,
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

  update(id: string, data: CreateAlertDto): Promise<any> {
    return this.alertRepository.update(id, data);
  }

  delete(id: string): Promise<any> {
    return this.alertRepository.delete(id);
  }

  deleteAll(): Promise<any> {
    return this.alertRepository.clear();
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
}

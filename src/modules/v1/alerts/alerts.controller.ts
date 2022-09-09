import { Controller, Get, Logger, Request } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alert } from './schemas/alert.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Alerts')
@Controller()
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}
  private readonly logger = new Logger(AlertsController.name);

  @Get()
  async index(@Request() request): Promise<Alert[]> {
    this.logger.log(
      `Request all alerts with options: ${JSON.stringify(request.query)}`,
    );
    return await this.alertsService.findAll();
  }
}

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

  @Get('/:location/:type')
  async findByLocationAndType(@Request() request): Promise<unknown> {
    this.logger.log(
      `Request alerts for location ${request.params.location} and type ${request.params.type}`,
    );
    const alert = await this.alertsService.findByLocationAndType(
      request.params.location,
      request.params.type,
    );
    return {
      id: alert ? alert.id : null,
      type: alert ? alert.type : null,
      event: alert ? alert.event : null,
      urgency: alert ? alert.urgency : null,
      location_code: alert ? alert.location_code : null,
      location_desc: alert ? alert.location_desc : null,
      severity: alert ? alert.severity : 'none',
      identifier: alert ? alert.identifier : null,
      certainty: alert ? alert.certainty : null,
      onset: alert ? alert.onset : null,
      expires: alert ? alert.expires : null,
      received: alert ? alert.received : null,
      active: !!alert,
    };
  }
}

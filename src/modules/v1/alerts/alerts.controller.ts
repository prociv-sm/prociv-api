import { Controller, Get, Logger, NotFoundException, Request } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Alerts')
@Controller()
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  private readonly logger = new Logger(AlertsController.name);

  /**
   * Get all alerts
   * @param request
   */
  @Get('/:location/:type')
  async findByLocationAndType(@Request() request) {
    this.logger.log(
      `Request alerts for location ${request.params.location} and type ${request.params.type}`,
    );
    const alert = await this.alertsService.findByLocationAndType(
      request.params.location,
      request.params.type,
    );
    if (!alert) {
      throw new NotFoundException(
        `No alerts found for location ${request.params.location} and type ${request.params.type}`,
      );
    }
    return alert;
  }
}

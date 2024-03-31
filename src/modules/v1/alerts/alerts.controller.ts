import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alert } from './schemas/alert.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAlertDto } from './dto/create-alert.dto';
import { AlertsProducerService } from './alerts.producer.service';

@ApiTags('Alerts')
@Controller()
export class AlertsController {
  constructor(
    private readonly alertsService: AlertsService,
    private readonly alertsProducerService: AlertsProducerService,
  ) {}
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

  //@UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateAlertDto })
  @HttpCode(HttpStatus.CREATED)
  //@ApiBearerAuth()
  @Post()
  async create(@Request() request): Promise<Alert> {
    const alert = request.body;
    this.logger.log(`Request to create alert: ${JSON.stringify(request.body)}`);
    await this.alertsProducerService.sendMessage(request.body);
    return alert;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Delete('/:id')
  async delete(@Request() request): Promise<Alert> {
    this.logger.log(`Request to delete alert: ${request.params.id}`);
    return await this.alertsService.delete(request.params.id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Delete('/')
  async deleteAll(): Promise<void> {
    this.logger.log(`Request to delete all alerts`);
    await this.alertsService.deleteAll();
  }
}

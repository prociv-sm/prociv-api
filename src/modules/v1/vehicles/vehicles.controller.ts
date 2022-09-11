import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Logger, Request } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './schemas/vehicles.entity';

@ApiTags('Vehicle')
@Controller()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}
  private readonly logger = new Logger(VehiclesController.name);

  @Get()
  async index(@Request() request): Promise<Vehicle[]> {
    this.logger.log(`Request vehicle with: ${JSON.stringify(request.query)}`);
    return this.vehiclesService.findAll(request.query.type);
  }
}

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
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
import { SquadsService } from './squads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Squad } from './schemas/squad.entity';
import { CreateSquadDto } from './dto/create-squad.dto';

@ApiTags('Squads')
@Controller()
export class SquadsController {
  constructor(private readonly squadsService: SquadsService) {}
  private readonly logger = new Logger(SquadsController.name);

  @Get()
  async index(@Request() request): Promise<Squad[]> {
    this.logger.log(`Request squads with: ${JSON.stringify(request.query)}`);
    return this.squadsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateSquadDto })
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Post()
  async create(@Request() request): Promise<Squad> {
    this.logger.log(`Request create squad: ${JSON.stringify(request.body)}`);
    return await this.squadsService.create(request.body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async delete(@Request() request): Promise<any> {
    this.logger.log(`Request to delete squad with id: ${request.params.id}`);
    return await this.squadsService.deleteOne(request.params.id);
  }
}

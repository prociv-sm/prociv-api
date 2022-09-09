import {
  Controller,
  Get,
  Request,
  Logger,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { Sector } from './schemas/sector.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSectorDto } from './dto/create-sector.dto';

@ApiTags('Sectors')
@Controller()
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}
  private readonly logger = new Logger(SectorsController.name);

  @Get()
  async index(@Request() request): Promise<Sector[]> {
    this.logger.log(
      `Request all sectors with options: ${JSON.stringify(request.query)}`,
    );
    return await this.sectorsService.findAll();
  }

  @Get('/:code')
  async show(@Request() request): Promise<Sector> {
    this.logger.log(`Request sector with code: ${request.params.code}`);
    return await this.sectorsService.findOne(request.params.code);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateSectorDto })
  @Post()
  async create(@Request() request): Promise<Sector> {
    this.logger.log(
      `Request to create sector: ${JSON.stringify(request.body)}`,
    );
    return await this.sectorsService.create(request.body);
  }
}

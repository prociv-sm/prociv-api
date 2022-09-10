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
import { ActivitiesService } from './activities.service';
import { Activity } from './schemas/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Activities')
@Controller()
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}
  private readonly logger = new Logger(ActivitiesController.name);

  @Get()
  async index(@Request() request): Promise<Activity[]> {
    this.logger.log(
      `Request activities with: ${JSON.stringify(request.query)}`,
    );
    return this.activitiesService.findAll(request.query.take);
  }

  @Get('/statistics')
  async statistics(@Request() request): Promise<any> {
    this.logger.log(`Request to get statistics`);
    return await this.activitiesService.statistics();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateActivityDto })
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Post()
  async create(@Request() request): Promise<Activity> {
    this.logger.log(`Request create activity: ${JSON.stringify(request.body)}`);
    return await this.activitiesService.create(request.body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  async delete(@Request() request): Promise<any> {
    this.logger.log(`Request to delete activity with id: ${request.params.id}`);
    return await this.activitiesService.deleteOne(request.params.id);
  }
}

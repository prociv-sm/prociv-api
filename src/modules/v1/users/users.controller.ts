import { Controller, Get, Logger, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import UserEntity from './schemas/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);

  @Get()
  async index(@Request() request): Promise<UserEntity[]> {
    this.logger.log(`Request all users: ${JSON.stringify(request.query)}`);
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async show(@Request() request): Promise<UserEntity> {
    this.logger.log(`Request user with id: ${request.params.id}`);
    return await this.usersService.findOne(request.params.id);
  }
}

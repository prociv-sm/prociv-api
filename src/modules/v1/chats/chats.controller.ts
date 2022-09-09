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
import { ChatsService } from './chats.service';
import { Chat } from './schemas/chat.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateChatDto } from './dto/create-chat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Chats')
@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  private readonly logger = new Logger(ChatsController.name);

  @Get()
  async index(@Request() request): Promise<Chat[]> {
    this.logger.log(
      `Request all chats with options: ${JSON.stringify(request.query)}`,
    );
    return await this.chatsService.findAll();
  }

  @Get('/:telegramId')
  async show(@Request() request): Promise<Chat> {
    this.logger.log(`Request chat with code: ${request.params.telegramId}`);
    return await this.chatsService.findOne(request.params.telegramId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateChatDto })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Request() request): Promise<Chat> {
    this.logger.log(`Request to create chat: ${JSON.stringify(request.body)}`);
    return await this.chatsService.create(request.body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:telegramId')
  async delete(@Request() request): Promise<any> {
    this.logger.log(
      `Request to delete chat with code: ${request.params.telegramId}`,
    );
    return await this.chatsService.deleteOne(request.params.telegramId);
  }
}

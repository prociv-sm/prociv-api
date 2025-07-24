import { Controller, Get, Logger } from "@nestjs/common";
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @Get('/status')
  @ApiOperation({ summary: 'Get the API status' })
  getStatus(): string {
    return this.appService.getStatus();
  }
}

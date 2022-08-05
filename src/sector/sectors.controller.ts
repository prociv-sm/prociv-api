import { Controller, Get } from '@nestjs/common';
import { SectorsService } from './sectors.service';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Get()
  async getAllSectors() {
    return {
      data: this.sectorsService.findAll(),
    };
  }
}

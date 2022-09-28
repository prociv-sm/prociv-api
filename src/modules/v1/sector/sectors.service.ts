import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './schemas/sector.entity';
import { CreateSectorDto } from './dto/create-sector.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private sectorsRepository: Repository<Sector>,
  ) {}
  private readonly logger = new Logger(SectorsService.name);

  findAll(): Promise<Sector[]> {
    return this.sectorsRepository.find();
  }

  findOne(code: string): Promise<Sector> {
    return this.sectorsRepository.findOneBy({ code });
  }

  async create(data: CreateSectorDto): Promise<Sector> {
    const sector = this.sectorsRepository.create(data);
    await this.sectorsRepository.save(data);
    return sector;
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async findNewSectors() {
    this.logger.log('Checking for new sectors');
    fs.readFile('./submissions/sectors.json', 'utf8', async (err, data) => {
      if (err) {
        this.logger.error(err);
        return;
      }
      const sectors = JSON.parse(data);
      for (const sector of sectors) {
        const sectorExists = await this.sectorsRepository.findOne({
          where: {
            code: sector.code,
          },
        });
        if (!sectorExists) {
          this.logger.log(`New sector found for area: ${sector.code}`);
          await this.create(sector);
        }
      }
    });
  }
}

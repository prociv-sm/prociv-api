import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { Sector } from './schemas/sector.entity';

@Processor('sectors')
export class SectorsConsumer {
  constructor(private readonly sectorService: SectorsService) {}

  private readonly logger = new Logger(SectorsConsumer.name);

  @Process()
  async createNewSectors(job: Job<Sector>) {
    const { data } = job;
    this.logger.log(`Incoming on alerts queue: ${JSON.stringify(data)}`);
    // Create or update sector
    const sector = await this.sectorService.findOne(data.code);
    if (sector) {
      this.logger.debug(
        `Sector already exists with code ${sector.code}, updating with new data`,
      );
      await this.sectorService.update(sector.code, {
        description: data.description,
      });
      return;
    }
    this.logger.log(`Creating new sector with code ${data.code}`);
    await this.sectorService.create(data);
  }
}

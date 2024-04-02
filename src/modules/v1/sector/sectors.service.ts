import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './schemas/sector.entity';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';

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

  async update(code: string, data: UpdateSectorDto): Promise<any> {
    return this.sectorsRepository.update(code, data);
  }

  async create(data: CreateSectorDto): Promise<Sector> {
    const sector = this.sectorsRepository.create(data);
    await this.sectorsRepository.save(data);
    return sector;
  }
}

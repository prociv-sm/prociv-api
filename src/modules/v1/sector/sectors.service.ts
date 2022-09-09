import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './schemas/sector.entity';
import { CreateSectorDto } from './dto/create-sector.dto';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private sectorsRepository: Repository<Sector>,
  ) {}

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

  remove(id: string): Promise<any> {
    return this.sectorsRepository.delete(id);
  }

  deleteByCode(code: string): Promise<any> {
    return this.sectorsRepository.delete({ code });
  }
}

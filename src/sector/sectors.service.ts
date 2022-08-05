import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from './sector.entity';

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
}

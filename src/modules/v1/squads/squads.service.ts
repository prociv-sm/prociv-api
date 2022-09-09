import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Squad } from './schemas/squad.entity';
import { CreateSquadDto } from './dto/create-squad.dto';

@Injectable()
export class SquadsService {
  constructor(
    @InjectRepository(Squad)
    private squadRepository: Repository<Squad>,
  ) {}

  findAll(): Promise<Squad[]> {
    return this.squadRepository.find();
  }

  async create(data: CreateSquadDto): Promise<Squad> {
    const squad = this.squadRepository.create(data);
    await this.squadRepository.save(data);
    return squad;
  }

  deleteOne(id: string): Promise<any> {
    return this.squadRepository.delete(id);
  }
}

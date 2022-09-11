import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './schemas/vehicles.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  findAll(type): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      where: {
        type: type,
      },
    });
  }
}

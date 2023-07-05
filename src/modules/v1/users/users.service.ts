import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './schemas/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userEntityRepository.find({
      select: [
        'id',
        'username',
        'email',
        'internal',
        'name',
        'surname',
        'verified',
      ],
    });
  }

  async findByUsername(username: string): Promise<any> {
    return this.userEntityRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findOne(id: number): Promise<any> {
    return this.userEntityRepository.findOne({
      where: {
        id,
      },
    });
  }
}

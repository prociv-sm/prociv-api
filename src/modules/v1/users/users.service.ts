import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './schemas/user.entity';
import * as bcrypt from 'bcryptjs';
import CreateUserDto from './dto/createUser.dto';

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

  async removeRefreshToken(userId: number) {
    return this.userEntityRepository.update(userId, {
      refreshToken: null,
    });
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userEntityRepository.update(userId, {
      refreshToken: currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.findOne(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async setTwoFactorSecret(secret: string, userId: number) {
    return this.userEntityRepository.update(userId, {
      twoFactorSecret: secret,
    });
  }

  async turnOnTwoFactorAuth(userId: number) {
    return this.userEntityRepository.update(userId, {
      twoFactorEnabled: true,
    });
  }

  async create(userData: CreateUserDto) {
    const newUser = this.userEntityRepository.create({
      ...userData,
    });
    await this.userEntityRepository.save(newUser);
    return newUser;
  }
}

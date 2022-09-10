import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './schemas/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  findAll(take): Promise<Activity[]> {
    return this.activityRepository.find({
      take: take ? take : 100,
    });
  }

  async create(data: CreateActivityDto): Promise<Activity> {
    const activity = this.activityRepository.create(data);
    await this.activityRepository.save(data);
    return activity;
  }

  deleteOne(id: string): Promise<any> {
    return this.activityRepository.delete(id);
  }

  statistics(): Promise<any> {
    return this.activityRepository.query(`
      SELECT type, COUNT(*) as count
      FROM activity
      GROUP BY type
    `);
  }
}

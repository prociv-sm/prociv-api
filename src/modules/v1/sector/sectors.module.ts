import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { Sector } from './schemas/sector.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { SectorsConsumer } from './sectors.consumer';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Sector])],
  controllers: [SectorsController],
  providers: [SectorsService, SectorsConsumer],
})
export class SectorsModule {}

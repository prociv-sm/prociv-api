import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { Sector } from './schemas/sector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  providers: [SectorsService],
  controllers: [SectorsController],
})
export class SectorsModule {}

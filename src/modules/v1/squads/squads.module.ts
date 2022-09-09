import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Squad } from './schemas/squad.entity';
import { SquadsService } from './squads.service';
import { SquadsController } from './squads.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Squad])],
  providers: [SquadsService],
  controllers: [SquadsController],
})
export class SquadsModule {}

import { IsString, IsDate } from 'class-validator';

export class SectorModel {
  readonly id: string;

  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsDate()
  created_at?: Date;
}

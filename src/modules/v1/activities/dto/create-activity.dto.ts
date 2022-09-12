import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty({
    description: 'Activity title',
    example: 'Monitoraggio canali',
  })
  title: string;

  @ApiProperty({
    description: 'Activity description',
    example: 'Attività di monitoraggio dei canali situati in zona 1',
  })
  description: string;

  @ApiProperty({
    description: 'Activity location',
    example: "Luogo dell'attività",
    required: false,
  })
  location: string;

  @ApiProperty({
    description: 'Type of activities from enum',
    example: 'rescue',
  })
  type: string;

  @ApiProperty({
    description: 'Operation start date',
    example: '2022-08-18 10:00:00.000',
  })
  startDate: Date = new Date();

  @ApiProperty({
    description: 'Operation end date',
    example: '2022-08-18 10:00:00.000',
  })
  endDate: Date = new Date();
}

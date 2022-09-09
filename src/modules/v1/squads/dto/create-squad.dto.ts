import { ApiProperty } from '@nestjs/swagger';

export class CreateSquadDto {
  @ApiProperty({
    description: 'Squad name',
    example: 'Squadra 1',
  })
  title: string;

  @ApiProperty({
    description: 'Squad description',
    example: 'Squadra di soccorso',
  })
  description: string;

  @ApiProperty({
    description: 'Squad members',
    example: 'Mario Rossi, Giuseppe Verdi',
  })
  members: string;

  @ApiProperty({
    description: 'Squad status',
    example: 'inactive',
    enum: ['active', 'inactive', 'available'],
  })
  status: string;
}

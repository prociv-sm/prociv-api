import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegistrationDto {
  constructor(body: RegistrationDto | null = null) {
    if (body) {
      this.username = body.username;
      this.password = body.password;
    }
  }

  @ApiProperty({
    description: 'Access username',
    example: 'a.tombolato',
  })
  @IsNotEmpty()
  @IsString()
  username: string = '';

  @ApiProperty({
    description: 'User email',
    example: 'example@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string = '';

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  password: string = '';
}

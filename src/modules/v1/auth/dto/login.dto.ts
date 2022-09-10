import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  constructor(body: LoginDto | null = null) {
    if (body) {
      this.username = body.username;
      this.password = body.password;
    }
  }

  @ApiProperty({
    description: 'Access username',
    example: 'andreat',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string = '';

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string = '';
}

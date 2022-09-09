import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../enums/role.enum';
import { InternalRole } from '../../../enums/internal.enum';

@Entity('users')
export default class UserEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  readonly password: string = '';

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  @Index({ unique: true })
  readonly email: string = '';

  @Column()
  role: Role;

  @Column()
  internalRole: InternalRole;

  @ApiProperty({ type: Boolean })
  @Column()
  readonly verified: boolean = false;
}

import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import Role from '../enums/role.enum';

@Entity('users')
export default class UserEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  internal: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User],
  })
  @ApiProperty({ type: [String] })
  public roles: Role[];

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  @Exclude({ toPlainOnly: true })
  readonly password: string = '';

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  @Index({ unique: true })
  @Expose({ groups: ['admin'] })
  readonly email: string = '';

  @Column({ default: false })
  public confirmedEmail: boolean;

  @Column()
  @Index({ unique: true })
  username: string;

  @ApiProperty({ type: Boolean })
  @Column()
  readonly verified: boolean = false;

  @Column({
    nullable: true,
  })
  @Exclude()
  public refreshToken?: string;

  @Column()
  @ApiProperty({ type: Boolean })
  public twoFactorEnabled: boolean = false;

  @Column({ nullable: true })
  @ApiProperty({ type: String })
  public twoFactorSecret?: string;
}

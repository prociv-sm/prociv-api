import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Squad extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'squadId' };

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  members: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}

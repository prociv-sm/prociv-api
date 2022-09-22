import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'activityId' };

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: new Date() })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}

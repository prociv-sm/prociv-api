import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'vehicleId' };

  @Column({ unique: true })
  title: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ length: 4 })
  year: string;

  @Column({ enum: ['car', 'truck', 'trailer'] })
  type: string;

  @Column()
  mileage: string;

  @Column()
  image: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}

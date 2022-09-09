import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'vehicleId' };

  @Column({ unique: true })
  plate: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  mileage: string;

  @Column({ nullable: true })
  lastMaintenance: Date;

  @Column()
  productionYear: number;

  @Column()
  image: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;
}

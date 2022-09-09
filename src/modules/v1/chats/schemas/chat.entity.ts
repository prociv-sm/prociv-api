import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'chatId' };

  @Column()
  telegram_id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  code: string;

  @Column()
  last_alert_code: string;

  @Column()
  last_alert_date: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

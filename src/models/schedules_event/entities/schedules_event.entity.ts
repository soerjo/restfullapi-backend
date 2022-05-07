import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SchedulesEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  events_name: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'date' })
  waktu_acara: Date;

  @Column({ type: 'int' })
  quota: number;

  @Column({ nullable: true })
  flier01: string;

  @Column({ nullable: true })
  flier02: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

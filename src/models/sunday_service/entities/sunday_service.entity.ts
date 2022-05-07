import { Exclude } from 'class-transformer';
import { Generation } from 'src/common/interfaces/generation.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SundayService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nama_ibadah: string;

  @Column()
  waktu_ibadah: string;

  @Column('simple-array')
  generation: Generation[];

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

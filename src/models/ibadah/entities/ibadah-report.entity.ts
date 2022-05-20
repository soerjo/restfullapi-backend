import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ibadah } from './ibadah.entity';

@Entity()
export class IbadahReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ibadah)
  ibadah: Ibadah;

  @Column({ type: 'bigint' })
  date: string;

  @Column('int')
  kehadiran_pria: number;

  @Column('int')
  kehadiran_perempuan: number;

  @Column('int')
  kehadiran_orang_baru_pria: number;

  @Column('int')
  kehadiran_orang_baru_perempuan: number;

  @Column('simple-array', { nullable: true, select: false })
  photos: string[];

  @Column('int', { default: 0 })
  total: number;

  @Exclude()
  @Column()
  created_by: string;

  @Exclude()
  updated_by: string;

  @Exclude()
  @CreateDateColumn({ select: false })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  getTotal() {
    this.total =
      this.kehadiran_orang_baru_perempuan +
      this.kehadiran_orang_baru_pria +
      this.kehadiran_perempuan +
      this.kehadiran_pria;
  }
}

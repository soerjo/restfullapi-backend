import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blesscomn } from './blesscomn.entity';

@Entity()
export class BlesscomnReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Blesscomn, (bc) => bc.nama_blesscomn)
  @JoinColumn()
  nama_blesscomn: Blesscomn;

  @Column({ type: 'bigint' })
  date: number;

  @Column('int')
  kehadiran_pria: number;

  @Column('int')
  kehadiran_perempuan: number;

  @Column('int')
  kehadiran_orang_baru_pria: number;

  @Column('int')
  kehadiran_orang_baru_perempuan: number;

  @Column('simple-array', { nullable: true })
  photo: string[];

  @Column('int')
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
  async sumTotal() {
    this.total =
      this.kehadiran_orang_baru_perempuan +
      this.kehadiran_orang_baru_pria +
      this.kehadiran_perempuan +
      this.kehadiran_pria;
  }
}

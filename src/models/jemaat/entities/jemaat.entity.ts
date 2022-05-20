import { Exclude } from 'class-transformer';
import { Gender } from 'src/common/interfaces/gender.enum';
import { Roles } from 'src/common/interfaces/roles.enum';
import { Baptis } from 'src/models/baptis/entities/bapti.entity';
import { Blesscomn } from 'src/models/blesscomn/entities/blesscomn.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Jemaat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nama_lengkap: string;

  @Column({ nullable: true })
  nama_panggilan: string;

  @Column({ nullable: true })
  defaultImage: string;

  @Column({ nullable: true })
  smallImage: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.LAKI_LAKI })
  jenis_kelamin: Gender;

  @Column('simple-array')
  role: Roles[];

  @Column({ type: 'date' })
  tanggal_lahir: Date;

  @Column({ nullable: true })
  tempat_lahir: string;

  @Column({ nullable: true })
  alamat: string;

  @Column({ type: 'date', nullable: true })
  tanggal_lahir_baru: Date;

  @ManyToOne(() => Blesscomn)
  @JoinColumn()
  blesscomn: Blesscomn;

  @ManyToOne(() => Blesscomn, (bc) => bc.vice_leader)
  vice_blesscomn: Blesscomn;

  @Column({ nullable: true })
  wilayah_pelayanan: string;

  @Column({ nullable: true })
  kelompok_murid: string;

  @OneToOne(() => Baptis, (bp) => bp.id, { nullable: true })
  @JoinColumn()
  baptis: Baptis;

  @Exclude()
  @CreateDateColumn({ select: false })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ select: false })
  updated_at: Date;
}

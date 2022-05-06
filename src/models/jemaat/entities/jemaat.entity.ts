import { Exclude } from 'class-transformer';
import { Gender } from 'src/common/interfaces/gender.enum';
import { Roles } from 'src/common/interfaces/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ nullable: true })
  blesscomn: string;

  @Column({ nullable: true })
  wilayah_pelayanan: string;

  @Column({ nullable: true })
  kelompok_murid: string;

  @Column({ nullable: true })
  baptis: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

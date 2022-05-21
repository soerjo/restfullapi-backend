import { Exclude } from 'class-transformer';
import { Jemaat } from 'src/models/jemaat/entities/jemaat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Baptis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Jemaat, (jm) => jm.nama_lengkap, { cascade: true })
  @JoinColumn()
  jemaat: Jemaat;

  @Column({ type: 'bigint' })
  waktu: string;

  @Column()
  nama_ayah: string;

  @Column()
  nama_ibu: string;

  @Column()
  alamat_ortu: string;

  @Column()
  dibaptis_oleh: string;

  @Column()
  saksi01: string;

  @Column()
  saksi02: string;

  @Column({ nullable: true })
  surat_baptis: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

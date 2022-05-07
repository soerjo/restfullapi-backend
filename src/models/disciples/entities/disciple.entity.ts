import { Exclude } from 'class-transformer';
import { Jemaat } from 'src/models/jemaat/entities/jemaat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Disciple {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nama_kelompok_murid: string;

  @ManyToOne(() => Jemaat, (jm) => jm.nama_lengkap)
  pembimbing: Jemaat;

  @OneToMany(() => Jemaat, (jm) => jm.id)
  murid: Jemaat[];

  @Column()
  buku: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

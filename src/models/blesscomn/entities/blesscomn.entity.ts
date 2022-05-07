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
export class Blesscomn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nama_blesscomn: string;

  @ManyToOne(() => Jemaat, (jm) => jm.nama_lengkap)
  leader: Jemaat;

  @OneToMany(() => Jemaat, (jm) => jm.nama_lengkap)
  vice_leader: Jemaat[];

  @Column('simple-array', { nullable: true })
  jemaat: string[];

  @Column({ nullable: true })
  alamat: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

import { Exclude } from 'class-transformer';
import { Blesscomn } from 'src/models/blesscomn/entities/blesscomn.entity';
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
export class WilPelayanan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nama_wilayah_pelayanan: string;

  @ManyToOne(() => Jemaat, (jm) => jm.nama_lengkap)
  spv: Jemaat;

  @OneToMany(() => Blesscomn, (bc) => bc.nama_blesscomn, { nullable: true })
  blesscomn: Blesscomn[];

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}

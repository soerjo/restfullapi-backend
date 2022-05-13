import { Exclude } from 'class-transformer';
import { Jemaat } from 'src/models/jemaat/entities/jemaat.entity';
import { WilPelayanan } from 'src/models/wil_pelayanan/entities/wil_pelayanan.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Blesscomn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WilPelayanan, (wil) => wil.blesscomn, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  wilayah: WilPelayanan;

  @Column({ unique: true })
  nama_blesscomn: string;

  @ManyToOne(() => Jemaat)
  @JoinColumn()
  leader: Jemaat;

  @OneToMany(() => Jemaat, (jm) => jm.vice_blesscomn)
  @JoinColumn()
  vice_leader: Jemaat[];

  @Column('simple-array', { nullable: true })
  jemaat: string[];

  @Column({ nullable: true })
  alamat: string;

  @Exclude()
  @CreateDateColumn({ select: false })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ select: false })
  updated_at: Date;
}

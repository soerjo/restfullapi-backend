import { Module } from '@nestjs/common';
import { WilPelayananService } from './wil_pelayanan.service';
import { WilPelayananController } from './wil_pelayanan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blesscomn } from '../blesscomn/entities/blesscomn.entity';
import { WilPelayanan } from './entities/wil_pelayanan.entity';
import { Jemaat } from '../jemaat/entities/jemaat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blesscomn, WilPelayanan, Jemaat])],
  controllers: [WilPelayananController],
  providers: [WilPelayananService],
})
export class WilPelayananModule {}

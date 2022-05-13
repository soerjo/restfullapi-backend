import { Module } from '@nestjs/common';
import { BlesscomnService } from './blesscomn.service';
import { BlesscomnController } from './blesscomn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlesscomnReportController } from './blesscomn-report.controller';
import { BlesscomnReportRepo } from './blesscomn-report.repository';
import { BlesscomnReportService } from './blesscomn-report.service';
import { BlesscomnRepository } from './blesscomn.repository';
import { JemaatRepository } from '../jemaat/jemaat.repository';
import { WilPelayanan } from '../wil_pelayanan/entities/wil_pelayanan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JemaatRepository,
      BlesscomnRepository,
      BlesscomnReportRepo,
      WilPelayanan,
    ]),
  ],
  controllers: [BlesscomnController, BlesscomnReportController],
  providers: [BlesscomnService, BlesscomnReportService],
})
export class BlesscomnModule {}

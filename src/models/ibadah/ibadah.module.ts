import { Module } from '@nestjs/common';
import { IbadahService } from './ibadah.service';
import { IbadahController } from './ibadah.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ibadah } from './entities/ibadah.entity';
import { IbadahReportController } from './ibadah-report.controller';
import { IbadahReportService } from './ibadah-report.service';
import { IbadahReportRepository } from './ibadah-report.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ibadah, IbadahReportRepository])],
  controllers: [IbadahController, IbadahReportController],
  providers: [IbadahService, IbadahReportService],
})
export class IbadahModule {}

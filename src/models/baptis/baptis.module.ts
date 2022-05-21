import { Module } from '@nestjs/common';
import { BaptisService } from './baptis.service';
import { BaptisController } from './baptis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jemaat } from '../jemaat/entities/jemaat.entity';
import { BaptisRepository } from './baptis.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Jemaat, BaptisRepository])],
  controllers: [BaptisController],
  providers: [BaptisService],
})
export class BaptisModule {}

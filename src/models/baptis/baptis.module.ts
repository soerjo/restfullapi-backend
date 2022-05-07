import { Module } from '@nestjs/common';
import { BaptisService } from './baptis.service';
import { BaptisController } from './baptis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jemaat } from '../jemaat/entities/jemaat.entity';
import { Baptis } from './entities/bapti.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jemaat, Baptis])],
  controllers: [BaptisController],
  providers: [BaptisService],
})
export class BaptisModule {}

import { Module } from '@nestjs/common';
import { BlesscomnService } from './blesscomn.service';
import { BlesscomnController } from './blesscomn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jemaat } from '../jemaat/entities/jemaat.entity';
import { Blesscomn } from './entities/blesscomn.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jemaat, Blesscomn])],
  controllers: [BlesscomnController],
  providers: [BlesscomnService],
})
export class BlesscomnModule {}

import { Module } from '@nestjs/common';
import { DisciplesService } from './disciples.service';
import { DisciplesController } from './disciples.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jemaat } from '../jemaat/entities/jemaat.entity';
import { Disciple } from './entities/disciple.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jemaat, Disciple])],
  controllers: [DisciplesController],
  providers: [DisciplesService],
})
export class DisciplesModule {}

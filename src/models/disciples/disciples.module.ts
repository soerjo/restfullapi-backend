import { Module } from '@nestjs/common';
import { DisciplesService } from './disciples.service';
import { DisciplesController } from './disciples.controller';

@Module({
  controllers: [DisciplesController],
  providers: [DisciplesService]
})
export class DisciplesModule {}

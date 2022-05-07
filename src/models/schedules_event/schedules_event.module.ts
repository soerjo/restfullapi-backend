import { Module } from '@nestjs/common';
import { SchedulesEventService } from './schedules_event.service';
import { SchedulesEventController } from './schedules_event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesEvent } from './entities/schedules_event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchedulesEvent])],
  controllers: [SchedulesEventController],
  providers: [SchedulesEventService],
})
export class SchedulesEventModule {}

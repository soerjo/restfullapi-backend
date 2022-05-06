import { Module } from '@nestjs/common';
import { SchedulesEventService } from './schedules_event.service';
import { SchedulesEventController } from './schedules_event.controller';

@Module({
  controllers: [SchedulesEventController],
  providers: [SchedulesEventService]
})
export class SchedulesEventModule {}

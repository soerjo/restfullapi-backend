import { PartialType } from '@nestjs/mapped-types';
import { CreateSchedulesEventDto } from './create-schedules_event.dto';

export class UpdateSchedulesEventDto extends PartialType(CreateSchedulesEventDto) {}

import { Injectable } from '@nestjs/common';
import { CreateSchedulesEventDto } from './dto/create-schedules_event.dto';
import { UpdateSchedulesEventDto } from './dto/update-schedules_event.dto';

@Injectable()
export class SchedulesEventService {
  create(createSchedulesEventDto: CreateSchedulesEventDto) {
    return 'This action adds a new schedulesEvent';
  }

  findAll() {
    return `This action returns all schedulesEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedulesEvent`;
  }

  update(id: number, updateSchedulesEventDto: UpdateSchedulesEventDto) {
    return `This action updates a #${id} schedulesEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedulesEvent`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Repository } from 'typeorm';
import { CreateSchedulesEventDto } from './dto/create-schedules_event.dto';
import { UpdateSchedulesEventDto } from './dto/update-schedules_event.dto';
import { SchedulesEvent } from './entities/schedules_event.entity';

@Injectable()
export class SchedulesEventService {
  constructor(
    @InjectRepository(SchedulesEvent)
    private scheduleEventRepo: Repository<SchedulesEvent>,
  ) {}

  async create(createSchedulesEventDto: CreateSchedulesEventDto) {
    const { events_name } = createSchedulesEventDto;
    const getEvent = this.scheduleEventRepo.findOne({ events_name });
    if (getEvent)
      throw new BadRequestException(
        `events ${events_name} has already registed`,
      );

    const saveEvents = this.scheduleEventRepo.save({
      ...createSchedulesEventDto,
    });

    return new ResponseDto({ data: saveEvents });
  }

  async findAll() {
    const data = await this.scheduleEventRepo.find();
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const getEvents = await this.scheduleEventRepo.findOne(id);
    if (!getEvents) throw new BadRequestException(`event is not found!`);

    return new ResponseDto({ data: getEvents });
  }

  async update(id: string, updateSchedulesEventDto: UpdateSchedulesEventDto) {
    const getEvents = await this.scheduleEventRepo.findOne(id);
    if (!getEvents) throw new BadRequestException(`event is not found!`);

    const { events_name } = updateSchedulesEventDto;
    const getEvent = this.scheduleEventRepo.findOne({ events_name });
    if (getEvent)
      throw new BadRequestException(
        `events ${events_name} has already registed`,
      );

    const saveEvents = this.scheduleEventRepo.save({
      ...getEvents,
      ...updateSchedulesEventDto,
    });

    return new ResponseDto({ data: saveEvents });
  }

  async remove(id: string) {
    const getEvent = await this.scheduleEventRepo.findOne(id);
    if (!getEvent) throw new BadRequestException(`event is not found!`);

    await this.scheduleEventRepo.remove(getEvent);
    return new ResponseDto({ message: `data success deleted!` });
  }
}

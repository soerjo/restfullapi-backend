import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchedulesEventService } from './schedules_event.service';
import { CreateSchedulesEventDto } from './dto/create-schedules_event.dto';
import { UpdateSchedulesEventDto } from './dto/update-schedules_event.dto';

@Controller('schedules-event')
export class SchedulesEventController {
  constructor(private readonly schedulesEventService: SchedulesEventService) {}

  @Post()
  create(@Body() createSchedulesEventDto: CreateSchedulesEventDto) {
    return this.schedulesEventService.create(createSchedulesEventDto);
  }

  @Get()
  findAll() {
    return this.schedulesEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesEventService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSchedulesEventDto: UpdateSchedulesEventDto,
  ) {
    return this.schedulesEventService.update(id, updateSchedulesEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesEventService.remove(id);
  }
}

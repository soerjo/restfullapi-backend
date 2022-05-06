import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesEventController } from './schedules_event.controller';
import { SchedulesEventService } from './schedules_event.service';

describe('SchedulesEventController', () => {
  let controller: SchedulesEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesEventController],
      providers: [SchedulesEventService],
    }).compile();

    controller = module.get<SchedulesEventController>(SchedulesEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

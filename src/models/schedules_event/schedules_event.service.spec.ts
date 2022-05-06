import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesEventService } from './schedules_event.service';

describe('SchedulesEventService', () => {
  let service: SchedulesEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulesEventService],
    }).compile();

    service = module.get<SchedulesEventService>(SchedulesEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

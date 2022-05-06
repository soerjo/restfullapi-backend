import { Test, TestingModule } from '@nestjs/testing';
import { SundayServiceController } from './sunday_service.controller';
import { SundayServiceService } from './sunday_service.service';

describe('SundayServiceController', () => {
  let controller: SundayServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SundayServiceController],
      providers: [SundayServiceService],
    }).compile();

    controller = module.get<SundayServiceController>(SundayServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { WilPelayananController } from './wil_pelayanan.controller';
import { WilPelayananService } from './wil_pelayanan.service';

describe('WilPelayananController', () => {
  let controller: WilPelayananController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WilPelayananController],
      providers: [WilPelayananService],
    }).compile();

    controller = module.get<WilPelayananController>(WilPelayananController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

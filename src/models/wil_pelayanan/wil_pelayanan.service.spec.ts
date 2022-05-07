import { Test, TestingModule } from '@nestjs/testing';
import { WilPelayananService } from './wil_pelayanan.service';

describe('WilPelayananService', () => {
  let service: WilPelayananService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WilPelayananService],
    }).compile();

    service = module.get<WilPelayananService>(WilPelayananService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Repository } from 'typeorm';
import { CreateSundayServiceDto } from './dto/create-sunday_service.dto';
import { UpdateSundayServiceDto } from './dto/update-sunday_service.dto';
import { SundayService } from './entities/sunday_service.entity';

@Injectable()
export class SundayServiceService {
  constructor(
    @InjectRepository(SundayService)
    private sundayServiceRepo: Repository<SundayService>,
  ) {}

  async create(createSundayServiceDto: CreateSundayServiceDto) {
    const { nama_ibadah, waktu_ibadah, generation } = createSundayServiceDto;
    const getSundayService = await this.sundayServiceRepo.findOne({
      nama_ibadah,
    });
    if (getSundayService)
      throw new BadRequestException(
        `sunday service ${nama_ibadah} has already registed`,
      );

    const saveSundayService = await this.sundayServiceRepo.save({
      nama_ibadah,
      generation,
      waktu_ibadah,
    });

    return new ResponseDto({ data: saveSundayService });
  }

  async findAll() {
    const data = await this.sundayServiceRepo.find();
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const getSundayService = await this.sundayServiceRepo.findOne(id);
    if (!getSundayService)
      throw new BadRequestException(`sunday service is not found!`);

    return new ResponseDto({ data: getSundayService });
  }

  async update(id: string, updateSundayServiceDto: UpdateSundayServiceDto) {
    const getSundayService = await this.sundayServiceRepo.findOne(id);
    if (!getSundayService)
      throw new BadRequestException(`sunday service is not found!`);

    const { nama_ibadah, waktu_ibadah, generation } = updateSundayServiceDto;
    const saveSundayService = await this.sundayServiceRepo.save({
      ...getSundayService,
      nama_ibadah,
      generation,
      waktu_ibadah,
    });

    return new ResponseDto({ data: saveSundayService });
  }

  async remove(id: string) {
    const getSundayService = await this.sundayServiceRepo.findOne(id);
    if (!getSundayService)
      throw new BadRequestException(`sunday service is not found!`);

    await this.sundayServiceRepo.remove(getSundayService);
    return new ResponseDto({ message: `data success deleted!` });
  }
}

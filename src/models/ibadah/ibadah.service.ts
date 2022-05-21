import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Repository } from 'typeorm';
import { CreateSundayServiceDto } from './dto/create-sunday_service.dto';
import { UpdateSundayServiceDto } from './dto/update-sunday_service.dto';
import { Ibadah } from './entities/ibadah.entity';

@Injectable()
export class IbadahService {
  constructor(
    @InjectRepository(Ibadah)
    private sundayServiceRepo: Repository<Ibadah>,
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

    const createIbadah = this.sundayServiceRepo.create();
    createIbadah.nama_ibadah = nama_ibadah;
    createIbadah.waktu_ibadah = waktu_ibadah + '';
    createIbadah.generation = generation;

    const saveSundayService = await this.sundayServiceRepo.save(createIbadah);
    saveSundayService.waktu_ibadah = new Date(
      +saveSundayService.waktu_ibadah,
    ).toTimeString();
    return new ResponseDto({ data: saveSundayService });
  }

  async findAll() {
    const data = await this.sundayServiceRepo.find();
    data.forEach(
      (ibadah) =>
        (ibadah.waktu_ibadah = new Date(+ibadah.waktu_ibadah).toTimeString()),
    );
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const getSundayService = await this.sundayServiceRepo.findOne(id);
    if (!getSundayService)
      throw new BadRequestException(`sunday service is not found!`);

    getSundayService.waktu_ibadah = new Date(
      +getSundayService.waktu_ibadah,
    ).toTimeString();

    return new ResponseDto({ data: getSundayService });
  }

  async update(id: string, updateSundayServiceDto: UpdateSundayServiceDto) {
    const getSundayService = await this.sundayServiceRepo.findOne(id);
    if (!getSundayService)
      throw new BadRequestException(`sunday service is not found!`);

    const { nama_ibadah, waktu_ibadah, generation } = updateSundayServiceDto;
    const createIbadah = this.sundayServiceRepo.create({ ...getSundayService });
    createIbadah.nama_ibadah = nama_ibadah;
    createIbadah.waktu_ibadah = waktu_ibadah + '';
    createIbadah.generation = generation;

    const saveSundayService = await this.sundayServiceRepo.save(createIbadah);
    saveSundayService.waktu_ibadah = new Date(
      +saveSundayService.waktu_ibadah,
    ).toTimeString();

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

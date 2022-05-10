import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateJemaatDto } from './dto/create-jemaat.dto';
import { UpdateJemaatDto } from './dto/update-jemaat.dto';
import { JemaatRepository } from './jemaat.repository';

@Injectable()
export class JemaatService {
  constructor(
    @InjectRepository(JemaatRepository)
    private jemaatRepo: JemaatRepository,
  ) {}

  async create(createJemaatDto: CreateJemaatDto) {
    const { nama_lengkap } = createJemaatDto;
    const getJemaat = await this.jemaatRepo.findOne({ nama_lengkap });
    if (getJemaat)
      throw new BadRequestException(`jemaat ${nama_lengkap} has registed`);

    const data = await this.jemaatRepo.save({
      ...createJemaatDto,
    });
    return new ResponseDto({ data });
  }

  async findAll() {
    const data = await this.jemaatRepo.find();
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const data = await this.jemaatRepo.findOne(id);
    return new ResponseDto({ data });
  }

  async update(id: string, updateJemaatDto: UpdateJemaatDto) {
    const getJemaat = await this.jemaatRepo.findOne(id);
    if (!getJemaat) throw new BadRequestException(`data jemaat is not found`);

    const data = await this.jemaatRepo.save({
      ...getJemaat,
      ...updateJemaatDto,
    });
    return new ResponseDto({ data });
  }

  async remove(id: string) {
    const getJemaat = await this.jemaatRepo.findOne(id);
    if (!getJemaat) throw new BadRequestException(`data jemaat is not found`);
    await this.jemaatRepo.remove(getJemaat);

    return new ResponseDto({
      message: `jemaat ${getJemaat.nama_lengkap} success deleted!`,
    });
  }
}

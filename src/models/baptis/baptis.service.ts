import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Repository } from 'typeorm';
import { Jemaat } from '../jemaat/entities/jemaat.entity';
import { CreateBaptisDto } from './dto/create-bapti.dto';
import { UpdateBaptisDto } from './dto/update-bapti.dto';
import { Baptis } from './entities/bapti.entity';

@Injectable()
export class BaptisService {
  constructor(
    @InjectRepository(Jemaat)
    private jemaatRepo: Repository<Jemaat>,
    @InjectRepository(Baptis)
    private baptisRepo: Repository<Baptis>,
  ) {}

  async create(createBaptisDto: CreateBaptisDto) {
    const { nama_lengkap, dibaptis_oleh, ...rest } = createBaptisDto;
    const getJemaat = await this.jemaatRepo.findOne({ nama_lengkap });
    if (!getJemaat)
      throw new BadRequestException(`jemaat ${nama_lengkap} is not found!`);
    const getPembaptis = await this.jemaatRepo.findOne({
      nama_lengkap: dibaptis_oleh,
    });
    if (!getPembaptis)
      throw new BadRequestException(`pembaptis ${nama_lengkap} is not found!`);

    const createBaptis = this.baptisRepo.create({ ...rest });
    createBaptis.nama_lengkap = getJemaat;
    createBaptis.dibaptis_oleh = getPembaptis;

    const data = await this.baptisRepo.save(createBaptis);

    return new ResponseDto({ data });
  }

  async findAll() {
    const data = await this.baptisRepo.find();
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const data = await this.baptisRepo.findOne(id);
    if (!data) throw new BadRequestException(`data baptis is not found!`);

    return new ResponseDto({ data });
  }

  async update(id: string, updateBaptisDto: UpdateBaptisDto) {
    const getBaptis = await this.baptisRepo.findOne(id);
    if (!getBaptis) throw new BadRequestException(`data baptis is not found!`);

    const { nama_lengkap, dibaptis_oleh, ...rest } = updateBaptisDto;
    const getJemaat = await this.jemaatRepo.findOne({ nama_lengkap });
    if (!getJemaat)
      throw new BadRequestException(`jemaat ${nama_lengkap} is not found!`);
    const getPembaptis = await this.jemaatRepo.findOne({
      nama_lengkap: dibaptis_oleh,
    });
    if (!getPembaptis)
      throw new BadRequestException(`pembaptis ${nama_lengkap} is not found!`);

    const data = await this.baptisRepo.save({
      ...getBaptis,
      ...rest,
      nama_lengkap: getJemaat,
      dibaptis_oleh: getPembaptis,
    });

    return new ResponseDto({ data });
  }

  async remove(id: string) {
    const getBaptis = await this.baptisRepo.findOne(id);
    if (!getBaptis) throw new BadRequestException(`data baptis is not found!`);

    await this.baptisRepo.remove(getBaptis);
    return new ResponseDto({ message: `data success deleted!` });
  }
}

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionDto } from 'src/common/dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Repository } from 'typeorm';
import { Jemaat } from '../jemaat/entities/jemaat.entity';
import { BaptisRepository } from './baptis.repository';
import { CreateBaptisDto } from './dto/create-bapti.dto';
import { GetBaptisDto } from './dto/get-query.dto';
import { QueryBaptisDto } from './dto/query-baptis.dto';
import { UpdateBaptisDto } from './dto/update-bapti.dto';

@Injectable()
export class BaptisService {
  private logger = new Logger(BaptisService.name);
  constructor(
    @InjectRepository(Jemaat)
    private jemaatRepo: Repository<Jemaat>,
    private baptisRepo: BaptisRepository,
  ) {}

  async create(createBaptisDto: CreateBaptisDto) {
    const { nama_lengkap, waktu, ...rest } = createBaptisDto;
    const getJemaat = await this.jemaatRepo.findOne({ nama_lengkap });
    if (!getJemaat)
      throw new BadRequestException(`jemaat ${nama_lengkap} is not found!`);

    const checkData = await this.baptisRepo.findOne({ jemaat: getJemaat });
    if (checkData)
      throw new BadRequestException(
        `data baptis ${nama_lengkap} is already exist`,
      );

    const createBaptis = this.baptisRepo.create({ ...rest });
    createBaptis.jemaat = getJemaat;
    createBaptis.waktu = waktu + '';

    const data = await this.baptisRepo.save(createBaptis);
    await this.jemaatRepo.save({
      ...getJemaat,
      baptis: data,
    });

    return new ResponseDto({ data });
  }

  async findAll(query: QueryBaptisDto) {
    const data = await this.baptisRepo.pagination(
      query as PageOptionDto,
      query as GetBaptisDto,
    );
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

    const { nama_lengkap, waktu, ...rest } = updateBaptisDto;
    const getJemaat = await this.jemaatRepo.findOne({ nama_lengkap });
    if (!getJemaat)
      throw new BadRequestException(`jemaat ${nama_lengkap} is not found!`);

    const createBaptis = this.baptisRepo.create({
      ...getBaptis,
      ...rest,
    });
    createBaptis.jemaat = getJemaat;
    createBaptis.waktu = waktu + '';

    const data = await this.baptisRepo.save(createBaptis);

    return new ResponseDto({ data });
  }

  async remove(id: string) {
    const getBaptis = await this.baptisRepo.findOne(id);
    if (!getBaptis) throw new BadRequestException(`data baptis is not found!`);

    await this.baptisRepo.remove(getBaptis);
    return new ResponseDto({ message: `data success deleted!` });
  }
}

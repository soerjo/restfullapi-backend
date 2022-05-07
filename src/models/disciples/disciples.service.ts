import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Repository } from 'typeorm';
import { Jemaat } from '../jemaat/entities/jemaat.entity';
import { CreateDiscipleDto } from './dto/create-disciple.dto';
import { UpdateDiscipleDto } from './dto/update-disciple.dto';
import { Disciple } from './entities/disciple.entity';

@Injectable()
export class DisciplesService {
  constructor(
    @InjectRepository(Jemaat)
    private jemaatRepo: Repository<Jemaat>,
    @InjectRepository(Disciple)
    private discipleRepo: Repository<Disciple>,
  ) {}

  async create(createDiscipleDto: CreateDiscipleDto) {
    const { pembimbing, murid, ...res } = createDiscipleDto;
    const getPembimbing = await this.jemaatRepo.findOne({
      nama_lengkap: pembimbing,
    });
    const getMurid: Jemaat[] = [];
    for (const disciple of murid) {
      getMurid.push(await this.jemaatRepo.findOne({ nama_lengkap: disciple }));
    }

    const data = await this.discipleRepo.save({
      ...res,
      pembimbing: getPembimbing,
      murid: getMurid,
    });

    return new ResponseDto({ data });
  }

  async findAll() {
    const data = await this.discipleRepo.find();
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const data = await this.discipleRepo.findOne(id);
    if (!data) throw new BadRequestException(`kelompok murid is not found`);

    return new ResponseDto({ data });
  }

  async update(id: string, updateDiscipleDto: UpdateDiscipleDto) {
    const getDisciple = await this.discipleRepo.findOne(id);
    if (!getDisciple)
      throw new BadRequestException(`kelompok murid is not found`);

    const { pembimbing, murid, ...res } = updateDiscipleDto;
    const getPembimbing = await this.jemaatRepo.findOne({
      nama_lengkap: pembimbing,
    });
    const getMurid: Jemaat[] = [];
    for (const disciple of murid) {
      getMurid.push(await this.jemaatRepo.findOne({ nama_lengkap: disciple }));
    }

    const saveDisciple = await this.discipleRepo.save({
      ...getDisciple,
      ...res,
      pembimbing: getPembimbing,
      murid: getMurid,
    });

    return new ResponseDto({
      message: `kelompok muird has been updated!`,
      data: saveDisciple,
    });
  }

  async remove(id: string) {
    const getDisciple = await this.discipleRepo.findOne(id);
    if (!getDisciple)
      throw new BadRequestException(`kelompok murid is not found`);

    await this.discipleRepo.remove(getDisciple);
    return new ResponseDto({
      message: `kelompok murid ${getDisciple.nama_kelompok_murid}success deleted!`,
    });
  }
}

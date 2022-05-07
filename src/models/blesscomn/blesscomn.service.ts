import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Repository } from 'typeorm';
import { Jemaat } from '../jemaat/entities/jemaat.entity';
import { CreateBlesscomnDto } from './dto/create-blesscomn.dto';
import { UpdateBlesscomnDto } from './dto/update-blesscomn.dto';
import { Blesscomn } from './entities/blesscomn.entity';

@Injectable()
export class BlesscomnService {
  constructor(
    @InjectRepository(Jemaat)
    private jemaatRepo: Repository<Jemaat>,
    @InjectRepository(Blesscomn)
    private blesscomnRepo: Repository<Blesscomn>,
  ) {}

  async create(createBlesscomnDto: CreateBlesscomnDto) {
    const { leader, vice_leader, ...res } = createBlesscomnDto;
    const getLeader = await this.jemaatRepo.findOne({ nama_lengkap: leader });
    if (!getLeader)
      throw new BadRequestException(`leader ${leader} is not jemaat`);
    const getVice: Jemaat[] = [];
    for (const vice of vice_leader) {
      getVice.push(await this.jemaatRepo.findOne({ nama_lengkap: vice }));
    }

    const saveBlesscomn = await this.blesscomnRepo.save({
      ...res,
      leader: getLeader,
      vice_leader: getVice,
    });

    return new ResponseDto({ data: saveBlesscomn });
  }

  async findAll() {
    const data = await this.blesscomnRepo.find();
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const data = await this.blesscomnRepo.findOne(id);
    if (!data) throw new BadRequestException(`blesscomn is not found`);

    return new ResponseDto({ data });
  }

  async update(id: string, updateBlesscomnDto: UpdateBlesscomnDto) {
    const getBlesscomn = await this.blesscomnRepo.findOne(id);
    if (!getBlesscomn) throw new BadRequestException(`blesscomn is not found`);

    const { leader, vice_leader, ...res } = updateBlesscomnDto;
    const getLeader = await this.jemaatRepo.findOne({ nama_lengkap: leader });
    if (!getLeader)
      throw new BadRequestException(`leader ${leader} is not jemaat`);
    const getVice: Jemaat[] = [];
    for (const vice of vice_leader) {
      getVice.push(await this.jemaatRepo.findOne({ nama_lengkap: vice }));
    }

    const updateBlesscomn = await this.blesscomnRepo.save({
      ...res,
      leader: getLeader,
      vice_leader: getVice,
    });

    return new ResponseDto({
      message: 'blesscomn has been updated!',
      data: updateBlesscomn,
    });
  }

  async remove(id: string) {
    const getBlesscomn = await this.blesscomnRepo.findOne(id);
    if (!getBlesscomn) throw new BadRequestException(`blesscomn is not found`);

    await this.blesscomnRepo.remove(getBlesscomn);
    return new ResponseDto({
      message: `blesscomn ${getBlesscomn.nama_blesscomn} success deleted!`,
    });
  }
}

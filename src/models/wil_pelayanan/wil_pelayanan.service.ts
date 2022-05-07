import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Repository } from 'typeorm';
import { Blesscomn } from '../blesscomn/entities/blesscomn.entity';
import { Jemaat } from '../jemaat/entities/jemaat.entity';
import { CreateWilPelayananDto } from './dto/create-wil_pelayanan.dto';
import { UpdateWilPelayananDto } from './dto/update-wil_pelayanan.dto';
import { WilPelayanan } from './entities/wil_pelayanan.entity';

@Injectable()
export class WilPelayananService {
  constructor(
    @InjectRepository(Jemaat)
    private jemaatRepo: Repository<Jemaat>,
    @InjectRepository(WilPelayanan)
    private wilPelayananRepo: Repository<WilPelayanan>,
    @InjectRepository(Blesscomn)
    private blesscomnRepo: Repository<Blesscomn>,
  ) {}

  async create(createWilPelayananDto: CreateWilPelayananDto) {
    const { spv, nama_wilayah_pelayanan } = createWilPelayananDto;
    const getSpv = await this.jemaatRepo.findOne({ nama_lengkap: spv });
    if (!getSpv) throw new BadRequestException(`spv ${spv} is not found!`);

    const saveWilPelayanan = await this.wilPelayananRepo.save({
      nama_wilayah_pelayanan,
      spv: getSpv,
    });

    return new ResponseDto({ data: saveWilPelayanan });
  }

  async findAll() {
    const data = await this.wilPelayananRepo.find();
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const data = await this.wilPelayananRepo.findOne(id);
    if (!data) throw new BadRequestException(`wilayah is not found!`);

    return new ResponseDto({ data });
  }

  async update(id: string, updateWilPelayananDto: UpdateWilPelayananDto) {
    const getWil = await this.wilPelayananRepo.findOne(id);
    if (!getWil) throw new BadRequestException(`wilayah is not found!`);

    const { spv, nama_wilayah_pelayanan, blesscomn } = updateWilPelayananDto;
    const getSpv = await this.jemaatRepo.findOne({ nama_lengkap: spv });
    if (!getSpv) throw new BadRequestException(`spv ${spv} is not found!`);

    const getBlesscomn: Blesscomn[] = [];
    for (const bc of blesscomn) {
      getBlesscomn.push(
        await this.blesscomnRepo.findOne({ nama_blesscomn: bc }),
      );
    }

    const updateWilPelayanan = await this.wilPelayananRepo.save({
      nama_wilayah_pelayanan,
      blesscomn: getBlesscomn,
      spv: getSpv,
    });

    return new ResponseDto({
      message: `wilayah success updated!`,
      data: updateWilPelayanan,
    });
  }

  async remove(id: string) {
    const getBaptis = await this.wilPelayananRepo.findOne(id);
    if (!getBaptis) throw new BadRequestException(`wilayah is not found!`);

    await this.wilPelayananRepo.remove(getBaptis);
    return new ResponseDto({ message: `data success deleted!` });
  }
}

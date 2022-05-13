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
    const queryBuilder = this.wilPelayananRepo.createQueryBuilder('wil');
    queryBuilder
      .leftJoin('wil.spv', 'spv')
      .addSelect('spv.nama_lengkap')
      .leftJoin('wil.blesscomn', 'bc')
      .addSelect('bc.nama_blesscomn');

    const data = (await queryBuilder.getMany()).map((obj) => {
      const getSpv = obj.spv.nama_lengkap;
      const getBc = obj.blesscomn.map((bc) => bc.nama_blesscomn);
      delete obj.spv;
      delete obj.blesscomn;
      return {
        ...obj,
        spv: getSpv,
        blesscomn: getBc,
      };
    });
    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const data = await this.wilPelayananRepo.findOne(id);
    if (!data) throw new BadRequestException(`wilayah is not found!`);

    return new ResponseDto({ data });
  }

  async update(id: string, updateWilPelayananDto: UpdateWilPelayananDto) {
    const { spv, blesscomn, nama_wilayah_pelayanan } = updateWilPelayananDto;

    // check wilayah has already exist
    const getWil = await this.wilPelayananRepo.findOne(id);
    if (!getWil) throw new BadRequestException(`wilayah is not found!`);

    // create object udate wilayah pelayanan
    const createWilPelayanan = this.wilPelayananRepo.create(getWil);
    createWilPelayanan.nama_wilayah_pelayanan = nama_wilayah_pelayanan;

    // get spv from jemaat table
    const getSpv = await this.jemaatRepo.findOne({ nama_lengkap: spv });
    if (!getSpv) throw new BadRequestException(`spv ${spv} is not found!`);
    createWilPelayanan.spv = getSpv;

    // get blesscomn from bblescomn table
    if (blesscomn) {
      const getBlesscomn: Blesscomn[] = [];
      for (const bc of blesscomn) {
        getBlesscomn.push(
          await this.blesscomnRepo.findOne({ nama_blesscomn: bc }),
        );
      }
      createWilPelayanan.blesscomn = getBlesscomn;
    }

    // updateWilPelayanan
    const updateWilPelayanan = await this.wilPelayananRepo.save(
      createWilPelayanan,
    );

    return new ResponseDto({
      message: `wilayah success updated!`,
      data: updateWilPelayanan,
    });
  }

  async remove(id: string) {
    const getWilayah = await this.wilPelayananRepo.findOne(id);
    if (!getWilayah) throw new BadRequestException(`wilayah is not found!`);

    await this.wilPelayananRepo.remove(getWilayah);
    return new ResponseDto({
      message: `data ${getWilayah.nama_wilayah_pelayanan} success deleted!`,
    });
  }
}

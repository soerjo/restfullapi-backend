import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Repository } from 'typeorm';
import { Jemaat } from '../jemaat/entities/jemaat.entity';
import { JemaatRepository } from '../jemaat/jemaat.repository';
import { WilPelayanan } from '../wil_pelayanan/entities/wil_pelayanan.entity';
import { CreateBlesscomnDto } from './dto/create-blesscomn.dto';
import { UpdateBlesscomnDto } from './dto/update-blesscomn.dto';
import { BlesscomnRepository } from './blesscomn.repository';
import { PageOptionDto, QueryPaginateDto } from 'src/common/dto';
import { GetReportDto } from './dto';
import { UserPayloadDto } from 'src/common/dto/user-payload.dto';

@Injectable()
export class BlesscomnService {
  constructor(
    @InjectRepository(WilPelayanan)
    private wilayahRepo: Repository<WilPelayanan>,
    private jemaatRepo: JemaatRepository,
    private blesscomnRepo: BlesscomnRepository,
  ) {}

  async create(createBlesscomnDto: CreateBlesscomnDto) {
    const { leader, vice_leader, jemaat, wilayah, ...res } = createBlesscomnDto;

    // check if the book has already exist
    const getBlesscomn = await this.blesscomnRepo.findOne({
      nama_blesscomn: res.nama_blesscomn,
    });
    if (getBlesscomn)
      throw new BadRequestException(
        `blesscomn ${res.nama_blesscomn} is already exist`,
      );

    // get Leader data from table Jemaat
    const getLeader = await this.jemaatRepo.findOne({ nama_lengkap: leader });
    if (!getLeader)
      throw new BadRequestException(`leader ${leader} is not jemaat`);

    // get Vice_Leader data from table Jemaat
    const getVice: Jemaat[] = [];
    for (const vice of vice_leader) {
      const getJemaat = await this.jemaatRepo.findOne({ nama_lengkap: vice });
      getVice.push(getJemaat);
    }

    // get wilayah data from table wilayah
    const wil = await this.wilayahRepo.findOne({
      nama_wilayah_pelayanan: wilayah,
    });
    if (!wil) throw new BadRequestException(`wilayah ${wilayah} is not found`);

    // create blesscomn data
    const createBlesscomn = this.blesscomnRepo.create({ ...res });

    // save blesscomn data
    createBlesscomn.leader = getLeader;
    createBlesscomn.vice_leader = getVice;
    createBlesscomn.jemaat = jemaat;
    createBlesscomn.wilayah = wil;
    const saveBlesscomn = await this.blesscomnRepo.save(createBlesscomn);

    // add Blesscomn to Jemaat entity
    if (saveBlesscomn.jemaat) {
      for (const people of saveBlesscomn.jemaat) {
        const getPeople = await this.jemaatRepo.findOne({
          nama_lengkap: people,
        });

        if (getPeople)
          await this.jemaatRepo.save({
            ...getPeople,
            blesscomn: saveBlesscomn,
          });
      }
    }

    return new ResponseDto({ data: saveBlesscomn });
  }

  async findAll(query: QueryPaginateDto, user: UserPayloadDto) {
    const queryBuilder = this.blesscomnRepo.createQueryBuilder('bc');
    queryBuilder
      .leftJoin('bc.wilayah', 'wil')
      .where('wil.spv = :user', { user: user.username });

    const getWilayah = await queryBuilder.getOne();

    const data = await this.blesscomnRepo.pagination(
      query as PageOptionDto,
      query as unknown as GetReportDto,
      getWilayah?.wilayah?.nama_wilayah_pelayanan,
    );

    return new ResponseDto({ data });
  }

  async findOne(id: string) {
    const data = await this.blesscomnRepo.findOne(id);
    if (!data) throw new BadRequestException(`blesscomn is not found`);

    return new ResponseDto({ data });
  }

  async update(id: string, updateBlesscomnDto: UpdateBlesscomnDto) {
    const { leader, vice_leader, jemaat, wilayah, ...res } = updateBlesscomnDto;

    // check if the book has exist
    const getBlesscomn = await this.blesscomnRepo.findOne(id);
    if (!getBlesscomn) throw new BadRequestException(`blesscomn is not found`);
    const createBlesscomn = this.blesscomnRepo.create({ ...res });

    // get Leader data
    if (leader) {
      const getLeader = await this.jemaatRepo.findOne({ nama_lengkap: leader });
      if (!getLeader)
        throw new BadRequestException(`leader ${leader} is not jemaat`);
      createBlesscomn.leader = getLeader;
    }

    // get Vice Leader data
    if (vice_leader) {
      const getVice: Jemaat[] = [];
      for (const vice of vice_leader) {
        getVice.push(await this.jemaatRepo.findOne({ nama_lengkap: vice }));
      }
      createBlesscomn.vice_leader = getVice;
    }

    // get wilayah data from table wilayah
    if (wilayah) {
      const wil = await this.wilayahRepo.findOne({
        nama_wilayah_pelayanan: wilayah,
      });
      if (!wil)
        throw new BadRequestException(`wilayah ${wilayah} is not found`);
      createBlesscomn.wilayah = wil;
    }

    // spreading jemaat
    if (jemaat) createBlesscomn.jemaat = jemaat;

    // update blesscomn data
    const updateBlesscomn = await this.blesscomnRepo.save({
      ...getBlesscomn,
      ...createBlesscomn,
    });

    // add Blesscomn to Jemaat entity
    if (jemaat) {
      if (updateBlesscomn.jemaat) {
        for (const people of updateBlesscomn.jemaat) {
          const getPeople = await this.jemaatRepo.findOne({
            nama_lengkap: people,
          });

          if (getPeople)
            await this.jemaatRepo.save({
              ...getPeople,
              blesscomn: updateBlesscomn,
            });
        }
      }
    }

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

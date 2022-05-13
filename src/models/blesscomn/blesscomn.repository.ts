import { Logger } from '@nestjs/common';
import { PageOptionDto, PageMetaDto, PageDto } from 'src/common/dto';
import { EntityRepository, Repository } from 'typeorm';
import { GetReportDto } from './dto';
import { Blesscomn } from './entities/blesscomn.entity';
import { keyofBlesscomn } from './type/keyofblesscomn';

@EntityRepository(Blesscomn)
export class BlesscomnRepository extends Repository<Blesscomn> {
  private logger = new Logger(BlesscomnRepository.name);

  async pagination(
    pageOptions: PageOptionDto,
    searchQuery: GetReportDto,
    wilayah?: string,
  ) {
    const { order, take, page } = pageOptions;
    const { orderBy, search, word } = searchQuery;
    const skip = (page - 1) * take;

    // wilayah = 'GKKDC-YOUTH';

    const queryBuilder = this.createQueryBuilder('bc');

    queryBuilder
      .leftJoin('bc.wilayah', 'wil')
      .addSelect('wil.nama_wilayah_pelayanan')
      .leftJoin('bc.leader', 'leader')
      .addSelect('leader.nama_lengkap')
      .leftJoin('bc.vice_leader', 'vc')
      .addSelect('vc.nama_lengkap');

    if (wilayah) {
      queryBuilder.where('wil.nama_wilayah_pelayanan LIKE :s', {
        s: `%${wilayah}%`,
      });
    }

    if (keyofBlesscomn.some((val) => val === search) && word) {
      if (search === 'wilayah') {
        queryBuilder.andWhere(`wil.nama_wilayah_pelayanan LIKE :s`, {
          s: `%${word}%`,
        });
      } else {
        queryBuilder.andWhere(`bc.${search} LIKE :s`, { s: `%${word}%` });
      }
    }

    if (keyofBlesscomn.some((val) => val === orderBy)) {
      queryBuilder.orderBy(`bc.${orderBy}`, order);
    }

    const itemCount = await queryBuilder.getCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptions });

    this.logger.log(`skip: ${skip}| take: ${take} |page: ${page}`);
    if (itemCount > take) queryBuilder.skip(skip).take(take);

    const data = (await queryBuilder.getMany()).map((obj) => {
      const getLeader = obj.leader.nama_lengkap;
      const getWil = obj?.wilayah?.nama_wilayah_pelayanan;
      const getViceLeader = obj.vice_leader.map((val) => val.nama_lengkap);
      delete obj.vice_leader;
      delete obj.leader;
      delete obj.wilayah;
      return {
        ...obj,
        wilayah: getWil,
        leader_name: getLeader,
        vice_leader_name: getViceLeader,
      };
    });

    return new PageDto(data, pageMetaDto);
  }
}

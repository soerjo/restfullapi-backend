import { EntityRepository, Repository } from 'typeorm';
import { PageMetaDto, PageDto, PageOptionDto } from 'src/common/dto';
import { Logger } from '@nestjs/common';
import { Baptis } from './entities/bapti.entity';
import { GetBaptisDto } from './dto/get-query.dto';

@EntityRepository(Baptis)
export class BaptisRepository extends Repository<Baptis> {
  private logger = new Logger(BaptisRepository.name);
  async pagination(pageOptions: PageOptionDto, searchQuery: GetBaptisDto) {
    const { order, take, page } = pageOptions;
    const { end_date, start_date, nama_jemaat } = searchQuery;
    const skip = (page - 1) * take;

    const queryBuilder = this.createQueryBuilder('baptis');
    queryBuilder
      .orderBy(`baptis.waktu`, order)
      .leftJoinAndSelect('baptis.jemaat', 'jemaat');
    if (start_date) {
      this.logger.log(
        `start_date: ${new Date(
          start_date,
        ).toLocaleDateString()}| end_date: ${new Date(
          end_date,
        ).toLocaleDateString()}`,
      );
      queryBuilder.andWhere(
        `baptis.waktu BETWEEN '${start_date}' AND '${end_date}'`,
      );
    }
    if (nama_jemaat) {
      this.logger.log(`nama_jemaat: ${nama_jemaat}`);
      queryBuilder.where(`jemaat.nama_lengkap LIKE :s`, {
        s: `%${nama_jemaat}%`,
      });
    }

    const itemCount = await queryBuilder.getCount();
    if (take) queryBuilder.skip(skip).take(take);

    queryBuilder.select(['baptis.id', 'baptis.waktu', 'jemaat.nama_lengkap']);
    const entities = await queryBuilder.getMany();
    const data = entities.map((obj) => {
      return {
        id: obj.id,
        waktu: obj.waktu,
        nama: obj.jemaat.nama_lengkap,
      };
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptions });
    return new PageDto(data, pageMetaDto);
  }
}

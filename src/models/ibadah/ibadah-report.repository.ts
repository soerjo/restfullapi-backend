import { Logger } from '@nestjs/common';
import { PageOptionDto, PageMetaDto, PageDto } from 'src/common/dto';
import { EntityRepository, Repository } from 'typeorm';
import { GetReportDto } from './dto';
import { IbadahReport } from './entities/ibadah-report.entity';

@EntityRepository(IbadahReport)
export class IbadahReportRepository extends Repository<IbadahReport> {
  private logger = new Logger(IbadahReportRepository.name);

  async pagination(pageOptions: PageOptionDto, searchQuery: GetReportDto) {
    const { order, take, page } = pageOptions;
    const { end_date, start_date, nama_ibadah } = searchQuery;
    const skip = (page - 1) * take;

    const queryBuilder = this.createQueryBuilder('report');
    queryBuilder
      .orderBy(`report.date`, order)
      .leftJoin('report.ibadah', 'ibadah')
      .addSelect('ibadah.nama_ibadah');
    if (start_date) {
      // this.logger.log(
      //   `start_date: ${new Date(
      //     start_date,
      //   ).toLocaleDateString()}| end_date: ${new Date(
      //     end_date,
      //   ).toLocaleDateString()}`,
      // );
      queryBuilder.andWhere(
        `report.date BETWEEN '${start_date}' AND '${end_date}'`,
      );
    }
    if (nama_ibadah) {
      // this.logger.log(`nama_ibadah: ${nama_ibadah}`);
      queryBuilder.where(`ibadah.nama_ibadah LIKE :s`, {
        s: `%${nama_ibadah}%`,
      });
    }

    const itemCount = await queryBuilder.getCount();
    // this.logger.log(`skip: ${skip}| take: ${take} |page: ${page}`);
    if (take) queryBuilder.skip(skip).take(take);

    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptions });
    return new PageDto(entities, pageMetaDto);
  }
}

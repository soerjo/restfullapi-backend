import { PageOptionDto } from 'src/common/dto';
import { EntityRepository, Repository } from 'typeorm';
import { PageMetaDto, PageDto } from 'src/common/dto';
import { BlesscomnReport } from './entities/blesscomn-report.entity';
import { GetReportDto } from './dto';
import { Logger } from '@nestjs/common';

@EntityRepository(BlesscomnReport)
export class BlesscomnReportRepo extends Repository<BlesscomnReport> {
  private logger = new Logger(BlesscomnReportRepo.name);
  async pagination(
    pageOptions: PageOptionDto,
    searchQuery: GetReportDto,
    blesscomn?: string,
  ) {
    const { order, take, page } = pageOptions;
    const { end_date, start_date, search, word } = searchQuery;
    const skip = (page - 1) * take;

    const queryBuilder = this.createQueryBuilder('report');
    queryBuilder
      .orderBy(`report.date`, order)
      .leftJoin('report.nama_blesscomn', 'bc')
      .addSelect('bc.nama_blesscomn');
    if (start_date) {
      this.logger.log(`start_date: ${start_date}| end_date: ${end_date}`);
      queryBuilder.andWhere(
        `report.date BETWEEN '${start_date}' AND '${end_date}'`,
      );
    }
    if (blesscomn) {
      this.logger.log(`blesscomn: ${blesscomn}`);
      queryBuilder.where(`report.nama_blesscomn LIKE :s`, {
        s: `%${blesscomn}%`,
      });
    }

    if (search && word) {
      this.logger.log(`word: ${word}`);
      queryBuilder.where(`bc.nama_blesscomn LIKE :s`, {
        s: `%${word}%`,
      });
    }

    const itemCount = await queryBuilder.getCount();
    this.logger.log(`skip: ${skip}| take: ${take} |page: ${page}`);
    if (take) queryBuilder.skip(skip).take(take);

    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptions });
    return new PageDto(entities, pageMetaDto);
  }
}

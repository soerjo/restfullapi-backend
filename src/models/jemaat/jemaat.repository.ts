import { PageOptionDto, SearchQueryDto } from 'src/common/dto';
import { EntityRepository, Repository } from 'typeorm';
import { Jemaat } from './entities/jemaat.entity';
import { keyofJemaat } from './type/propertykey.enum';
import { PageMetaDto, PageDto } from 'src/common/dto';

@EntityRepository(Jemaat)
export class JemaatRepository extends Repository<Jemaat> {
  async pagination(pageOptions: PageOptionDto, searchQuery: SearchQueryDto) {
    const { order, take, page } = pageOptions;
    const { orderBy, search, word } = searchQuery;
    const skip = (page - 1) * take;

    const queryBuilder = this.createQueryBuilder('jemaat');
    queryBuilder
      .select([
        'jemaat.id',
        'jemaat.nama_lengkap',
        'jemaat.smallImage',
        'jemaat.jenis_kelamin',
      ])
      .leftJoin('jemaat.blesscomn', 'bc')
      .addSelect('bc.nama_blesscomn');

    if (keyofJemaat.some((val) => val === orderBy))
      queryBuilder.orderBy(`jemaat.${orderBy}`, order);
    if (keyofJemaat.some((val) => val === search) && word)
      queryBuilder.where(`jemaat.${search} LIKE :s`, { s: `%${word}%` });

    const itemCount = await queryBuilder.getCount();
    if (itemCount < 10)
      return (await queryBuilder.getMany()).map((val) => {
        const getBlesscomn = val.blesscomn?.nama_blesscomn;
        delete val.blesscomn;
        return {
          ...val,
          blesscomn: getBlesscomn,
        };
      });

    queryBuilder.skip(skip).take(take);
    const { entities } = await queryBuilder.getRawAndEntities();
    const data = entities.map((val) => {
      const getBlesscomn = val.blesscomn?.nama_blesscomn;
      delete val.blesscomn;
      return {
        ...val,
        blesscomn: getBlesscomn,
      };
    });
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptions });
    return new PageDto(data, pageMetaDto);
  }
}

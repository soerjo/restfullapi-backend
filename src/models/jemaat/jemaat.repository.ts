import { PageOptionDto, SearchQueryDto } from 'src/common/dto';
import { EntityRepository, Repository } from 'typeorm';
import { Jemaat } from './entities/jemaat.entity';
import { keyofJemaat } from './type/propertykey.enum';
import { PageMetaDto, PageDto } from 'src/common/dto';

@EntityRepository(Jemaat)
export class JemaatRepository extends Repository<Jemaat> {
  async pagination(pageOptions: PageOptionDto, searchQuery: SearchQueryDto) {
    const { order, skip, take } = pageOptions;
    const { orderBy, search, word } = searchQuery;

    const queryBuilder = this.createQueryBuilder('jemaat');
    queryBuilder.select([
      'jemaat.id',
      'jemaat.nama_lengkap',
      'jemaat.smallImage',
      'jemaat.jenis_kelamin',
      'jemaat.blesscomn',
    ]);
    if (keyofJemaat.some((val) => val === orderBy))
      queryBuilder.orderBy(`jemaat.${orderBy}`, order);
    if (keyofJemaat.some((val) => val === search) && word)
      queryBuilder.where(`jemaat.${search} LIKE :s`, { s: `%${word}%` });

    const itemCount = await queryBuilder.getCount();
    if (itemCount < 10) return await queryBuilder.getMany();

    queryBuilder.skip(skip).take(take);
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptions });
    return new PageDto(entities, pageMetaDto);
  }
}

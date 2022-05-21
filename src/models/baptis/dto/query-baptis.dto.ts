import { IntersectionType } from '@nestjs/mapped-types';
import { PageOptionDto } from 'src/common/dto';
import { GetBaptisDto } from './get-baptis.dto';

export class QueryBaptisDto extends IntersectionType(
  GetBaptisDto,
  PageOptionDto,
) {}

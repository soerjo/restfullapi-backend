import { IntersectionType } from '@nestjs/mapped-types';
import { PageOptionDto } from 'src/common/dto';
import { GetReportDto } from './get-report.dto';

export class QueryReportDto extends IntersectionType(
  GetReportDto,
  PageOptionDto,
) {}

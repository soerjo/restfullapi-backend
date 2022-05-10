import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PageOptionDto } from './page-option.dto';

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  word?: string;
}

export class QueryPaginateDto extends IntersectionType(
  SearchQueryDto,
  PageOptionDto,
) {}

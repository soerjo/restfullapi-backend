import { IntersectionType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { PageOptionDto } from './page-option.dto';

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  word?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  start_date: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  end_date: number = new Date().getTime();
}

export class QueryPaginateDto extends IntersectionType(
  SearchQueryDto,
  PageOptionDto,
) {}

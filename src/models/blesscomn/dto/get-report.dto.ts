import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { SearchQueryDto } from 'src/common/dto';

export class GetReportDto extends SearchQueryDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  start_date: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  end_date: number = new Date().getTime();
}

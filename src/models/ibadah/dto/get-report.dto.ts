import { IsOptional, IsString } from 'class-validator';
import { SearchQueryDto } from 'src/common/dto';

export class GetReportDto extends SearchQueryDto {
  @IsString()
  @IsOptional()
  nama_ibadah?: string;
}

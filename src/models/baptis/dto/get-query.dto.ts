import { IsOptional, IsString } from 'class-validator';
import { SearchQueryDto } from 'src/common/dto';

export class GetBaptisDto extends SearchQueryDto {
  @IsString()
  @IsOptional()
  nama_jemaat?: string;
}

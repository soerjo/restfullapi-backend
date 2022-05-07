import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateWilPelayananDto } from './create-wil_pelayanan.dto';

export class UpdateWilPelayananDto extends PartialType(CreateWilPelayananDto) {
  @IsString({ each: true })
  @IsOptional()
  blesscomn: string[];
}

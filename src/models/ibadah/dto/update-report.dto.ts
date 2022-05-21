import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateReportDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  date?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  kehadiran_pria: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  kehadiran_perempuan: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  kehadiran_orang_baru_pria: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  kehadiran_orang_baru_perempuan: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  total: number;
}

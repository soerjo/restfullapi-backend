import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  nama_ibadah: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  date: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  kehadiran_pria: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  kehadiran_perempuan: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  kehadiran_orang_baru_pria: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  kehadiran_orang_baru_perempuan: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  total: number;
}

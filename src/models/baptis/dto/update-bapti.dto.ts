import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBaptisDto {
  @IsNumber()
  @IsOptional()
  waktu: number;

  @IsString()
  @IsOptional()
  nama_ayah: string;

  @IsString()
  @IsOptional()
  nama_ibu: string;

  @IsString()
  @IsOptional()
  alamat_ortu: string;

  @IsString()
  @IsOptional()
  dibaptis_oleh: string;

  @IsString()
  @IsOptional()
  saksi01: string;

  @IsString()
  @IsOptional()
  saksi02: string;
}

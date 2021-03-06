import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBaptisDto {
  @IsString()
  @IsNotEmpty()
  nama_lengkap: string;

  @IsNumber()
  @IsNotEmpty()
  waktu: number;

  @IsString()
  @IsNotEmpty()
  nama_ayah: string;

  @IsString()
  @IsNotEmpty()
  nama_ibu: string;

  @IsString()
  @IsNotEmpty()
  alamat_ortu: string;

  @IsString()
  @IsNotEmpty()
  dibaptis_oleh: string;

  @IsString()
  @IsNotEmpty()
  saksi01: string;

  @IsString()
  @IsNotEmpty()
  saksi02: string;
}

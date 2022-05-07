import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWilPelayananDto {
  @IsString()
  @IsNotEmpty()
  nama_wilayah_pelayanan: string;

  @IsString()
  @IsNotEmpty()
  spv: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiscipleDto {
  @IsString()
  @IsNotEmpty()
  nama_kelompok_murid: string;

  @IsString()
  @IsNotEmpty()
  pembimbing: string;

  @IsString({ each: true })
  @IsNotEmpty()
  murid: string[];

  @IsString()
  @IsNotEmpty()
  buku: string;
}

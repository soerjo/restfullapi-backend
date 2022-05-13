import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlesscomnDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  nama_blesscomn: string;

  @IsString()
  @IsNotEmpty()
  wilayah: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  alamat: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  leader: string;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.map((val) => val.toLowerCase()))
  @IsNotEmpty()
  vice_leader: string[];

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.map((val) => val.toLowerCase()))
  @IsOptional()
  jemaat: string[];
}

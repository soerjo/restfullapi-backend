import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender, Roles } from 'src/common/interfaces';

export class CreateJemaatDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  nama_lengkap: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  nama_panggilan: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  jenis_kelamin: Gender;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsOptional()
  email?: string;

  @IsEnum(Roles, { each: true })
  @IsOptional()
  role: Roles[] = [Roles.JEMAAT];

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  tanggal_lahir: Date;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  tempat_lahir: string;

  @IsString()
  @IsOptional()
  alamat?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  tanggal_lahir_baru?: Date;

  @IsString()
  @IsOptional()
  blesscomn: string;

  @IsString()
  @IsOptional()
  wilayah_pelayanan: string;

  @IsString()
  @IsOptional()
  kelompok_murid: string;
}

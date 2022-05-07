import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlesscomnDto {
  @IsString()
  @IsNotEmpty()
  nama_blesscomn: string;

  @IsString()
  @IsOptional()
  alamat: string;

  @IsString()
  @IsNotEmpty()
  leader: string;

  @IsString({ each: true })
  @IsNotEmpty()
  vice_leader: string[];

  @IsString({ each: true })
  @IsOptional()
  jemaat: string[];
}

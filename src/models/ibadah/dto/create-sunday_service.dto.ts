import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Generation } from 'src/common/interfaces/generation.enum';

export class CreateSundayServiceDto {
  @IsString()
  @IsNotEmpty()
  nama_ibadah: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  waktu_ibadah: number;

  @IsEnum(Generation, { each: true })
  @IsNotEmpty()
  generation: Generation[];
}

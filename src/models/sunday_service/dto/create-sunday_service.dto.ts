import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Generation } from 'src/common/interfaces/generation.enum';

export class CreateSundayServiceDto {
  @IsString()
  @IsNotEmpty()
  nama_ibadah: string;

  @IsString()
  @IsNotEmpty()
  waktu_ibadah: string;

  @IsEnum(Generation, { each: true })
  @IsNotEmpty()
  generation: Generation[];
}

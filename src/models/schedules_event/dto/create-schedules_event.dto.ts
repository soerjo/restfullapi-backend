import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateSchedulesEventDto {
  @IsString()
  @IsNotEmpty()
  events_name: string;

  @IsString()
  @IsOptional()
  details: string;

  @IsDate()
  @IsNotEmpty()
  waktu_acara: Date;

  @IsNumber()
  @IsNotEmpty()
  @Min(5)
  quota: number;

  @IsString()
  @IsOptional()
  flier01: string;

  @IsString()
  @IsOptional()
  flier02: string;
}

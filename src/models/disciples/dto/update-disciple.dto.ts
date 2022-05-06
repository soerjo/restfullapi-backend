import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscipleDto } from './create-disciple.dto';

export class UpdateDiscipleDto extends PartialType(CreateDiscipleDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateBaptisDto } from './create-bapti.dto';

export class UpdateBaptisDto extends PartialType(CreateBaptisDto) {}

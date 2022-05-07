import { PartialType } from '@nestjs/mapped-types';
import { CreateBlesscomnDto } from './create-blesscomn.dto';

export class UpdateBlesscomnDto extends PartialType(CreateBlesscomnDto) {}

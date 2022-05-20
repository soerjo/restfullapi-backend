import { PartialType } from '@nestjs/mapped-types';
import { CreateSundayServiceDto } from './create-sunday_service.dto';

export class UpdateSundayServiceDto extends PartialType(
  CreateSundayServiceDto,
) {}

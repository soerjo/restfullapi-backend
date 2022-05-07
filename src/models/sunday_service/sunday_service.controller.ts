import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SundayServiceService } from './sunday_service.service';
import { CreateSundayServiceDto } from './dto/create-sunday_service.dto';
import { UpdateSundayServiceDto } from './dto/update-sunday_service.dto';

@Controller('sunday-service')
export class SundayServiceController {
  constructor(private readonly sundayServiceService: SundayServiceService) {}

  @Post()
  create(@Body() createSundayServiceDto: CreateSundayServiceDto) {
    return this.sundayServiceService.create(createSundayServiceDto);
  }

  @Get()
  findAll() {
    return this.sundayServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sundayServiceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSundayServiceDto: UpdateSundayServiceDto,
  ) {
    return this.sundayServiceService.update(id, updateSundayServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sundayServiceService.remove(id);
  }
}

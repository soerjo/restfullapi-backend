import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BaptisService } from './baptis.service';
import { CreateBaptisDto } from './dto/create-bapti.dto';
import { UpdateBaptisDto } from './dto/update-bapti.dto';

@Controller('baptis')
export class BaptisController {
  constructor(private readonly baptisService: BaptisService) {}

  @Post()
  create(@Body() createBaptisDto: CreateBaptisDto) {
    return this.baptisService.create(createBaptisDto);
  }

  @Get()
  findAll() {
    return this.baptisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baptisService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaptisDto: UpdateBaptisDto) {
    return this.baptisService.update(id, updateBaptisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baptisService.remove(id);
  }
}

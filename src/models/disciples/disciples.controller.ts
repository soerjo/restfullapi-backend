import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisciplesService } from './disciples.service';
import { CreateDiscipleDto } from './dto/create-disciple.dto';
import { UpdateDiscipleDto } from './dto/update-disciple.dto';

@Controller('disciples')
export class DisciplesController {
  constructor(private readonly disciplesService: DisciplesService) {}

  @Post()
  create(@Body() createDiscipleDto: CreateDiscipleDto) {
    return this.disciplesService.create(createDiscipleDto);
  }

  @Get()
  findAll() {
    return this.disciplesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscipleDto: UpdateDiscipleDto) {
    return this.disciplesService.update(+id, updateDiscipleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplesService.remove(+id);
  }
}

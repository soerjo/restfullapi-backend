import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WilPelayananService } from './wil_pelayanan.service';
import { CreateWilPelayananDto } from './dto/create-wil_pelayanan.dto';
import { UpdateWilPelayananDto } from './dto/update-wil_pelayanan.dto';

@Controller('wil-pelayanan')
export class WilPelayananController {
  constructor(private readonly wilPelayananService: WilPelayananService) {}

  @Post()
  create(@Body() createWilPelayananDto: CreateWilPelayananDto) {
    return this.wilPelayananService.create(createWilPelayananDto);
  }

  @Get()
  findAll() {
    return this.wilPelayananService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wilPelayananService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWilPelayananDto: UpdateWilPelayananDto,
  ) {
    return this.wilPelayananService.update(id, updateWilPelayananDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wilPelayananService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IbadahService } from './ibadah.service';
import { CreateSundayServiceDto } from './dto/create-sunday_service.dto';
import { UpdateSundayServiceDto } from './dto/update-sunday_service.dto';
import { Generation } from 'src/common/interfaces/generation.enum';

@Controller('ibadah')
export class IbadahController {
  constructor(private readonly ibadahService: IbadahService) {}

  @Post()
  create(@Body() createSundayServiceDto: CreateSundayServiceDto) {
    return this.ibadahService.create(createSundayServiceDto);
  }

  @Get('/generation')
  getGeneration(): { generation: Generation[] } {
    return {
      generation: [
        Generation.KARAYAWAN,
        Generation.KELUARGA,
        Generation.MAHASISWA,
        Generation.PELAJAR,
        Generation.SEKOLAH_MINGGU,
        Generation.UMUM,
        Generation.USIA_EMAS,
      ],
    };
  }

  @Get()
  findAll() {
    return this.ibadahService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ibadahService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSundayServiceDto: UpdateSundayServiceDto,
  ) {
    return this.ibadahService.update(id, updateSundayServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ibadahService.remove(id);
  }
}

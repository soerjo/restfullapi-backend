import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { JemaatService } from './jemaat.service';
import { CreateJemaatDto } from './dto/create-jemaat.dto';
import { UpdateJemaatDto } from './dto/update-jemaat.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { imageFileFilter } from 'src/common/utils/file-upload.utils';
import { QueryPaginateDto } from 'src/common/dto';

@Controller('jemaat')
export class JemaatController {
  constructor(private readonly jemaatService: JemaatService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createJemaatDto: CreateJemaatDto,
  ) {
    return this.jemaatService.create(createJemaatDto, image);
  }

  @Get()
  findAll(@Query() query: QueryPaginateDto) {
    return this.jemaatService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jemaatService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  update(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateJemaatDto: UpdateJemaatDto,
  ) {
    return this.jemaatService.update(id, updateJemaatDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jemaatService.remove(id);
  }
}

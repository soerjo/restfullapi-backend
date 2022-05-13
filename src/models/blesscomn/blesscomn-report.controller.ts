import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UserPayloadDto } from 'src/common/dto/user-payload.dto';
import { Roles } from 'src/common/interfaces';
import { imageFileFilter } from 'src/common/utils/file-upload.utils';
import { BlesscomnReportService } from './blesscomn-report.service';
import { QueryReportDto, CreateReportDto } from './dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('blesscomn-report')
export class BlesscomnReportController {
  user: UserPayloadDto = {
    role: [Roles.ADMIN],
    userid: '01',
    username: 'soerjo hasto',
  };

  constructor(private bcReportService: BlesscomnReportService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createReport: CreateReportDto,
  ) {
    return this.bcReportService.create(createReport, image, this.user);
  }

  @Get()
  getReport(@Query() query: QueryReportDto) {
    return this.bcReportService.findAll(query, this.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bcReportService.findOne(id);
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
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return this.bcReportService.update(id, updateReportDto, image, this.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bcReportService.remove(id);
  }
}

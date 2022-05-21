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
import { CreateReportDto, QueryReportDto, UpdateReportDto } from './dto';
import { IbadahReportService } from './ibadah-report.service';

@Controller('ibadah-report')
export class IbadahReportController {
  user: UserPayloadDto = {
    role: [Roles.ADMIN],
    userid: '01',
    username: 'soerjo hasto',
  };

  constructor(private ibadahReportService: IbadahReportService) {}

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
    return this.ibadahReportService.create(createReport, image, this.user);
  }

  @Get()
  getReport(@Query() query: QueryReportDto) {
    return this.ibadahReportService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ibadahReportService.findOne(id);
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
    return this.ibadahReportService.update(
      id,
      updateReportDto,
      image,
      this.user,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ibadahReportService.remove(id);
  }
}

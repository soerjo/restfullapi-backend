import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import { join } from 'path';
import { JEMAAT_PATH_FOLDER } from 'src/common/constants/image-path.constant';
import { imageFileFilter } from 'src/common/utils/file-upload.utils';

@Controller('image')
export class MulterController {
  @Post('dokumentasi')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() files: Express.Multer.File) {
    const response = {
      originalName: files.originalname,
      fileName: files.filename,
      test_destination: files.destination,
      test_filedName: files.fieldname,
      test_path: files.path,
    };

    return response;
  }

  @Get('/jemaat/:id')
  getJemaatImage(@Param('id') id: string, @Res() res: Response) {
    return res.sendFile(join(process.cwd(), JEMAAT_PATH_FOLDER + id));
  }
  @Get('/event-flier/:id')
  getFlierImage(@Param('id') id: string, @Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'uploads/event-flier/' + id));
  }
  @Get('/blesscomn/:id')
  getBlesscomnImage(@Param('id') id: string, @Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'uploads/blesscomn/' + id));
  }
}

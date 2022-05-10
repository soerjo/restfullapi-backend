import { Module } from '@nestjs/common';
import { MulterController } from './multer.controller';
import { MulterService } from './multer.service';

@Module({
  controllers: [MulterController],
  providers: [MulterService]
})
export class MulterModule {}

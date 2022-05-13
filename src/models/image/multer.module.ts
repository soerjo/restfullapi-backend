import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterController } from './multer.controller';
import { MulterService } from './multer.service';

@Module({
  imports: [MulterModule.register()],
  controllers: [MulterController],
  providers: [MulterService],
})
export class UploadModule {}

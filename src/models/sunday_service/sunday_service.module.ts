import { Module } from '@nestjs/common';
import { SundayServiceService } from './sunday_service.service';
import { SundayServiceController } from './sunday_service.controller';

@Module({
  controllers: [SundayServiceController],
  providers: [SundayServiceService]
})
export class SundayServiceModule {}
